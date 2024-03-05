const express = require('express');
const moment = require('moment'); // Ensure moment is installed
const app = express();
const port = 3001;
const cors = require('cors');
const { spawn } = require('child_process');


app.use(cors());
app.use(express.json());
// app.set('trust proxy', true);

let emails = [];


let malicious_ips = [
    "45.116.226.110", "42.54.157.107", "103.240.252.246", "45.116.226.108",
    "201.231.6.142", "167.99.39.82", "203.138.203.9", "194.169.175.161",
    "45.116.226.105", "45.116.226.104", "103.240.252.241", "201.231.83.15",
    "166.88.132.194", "88.97.14.112", "210.140.43.55", "74.115.234.34",
    "45.116.226.100", "64.93.80.3", "49.72.171.4", "91.211.177.37",
    "185.229.237.199", "45.116.226.95", "203.138.203.194", "103.240.252.231",
    "200.149.77.6", "100.2.244.138", "103.251.167.20", "109.70.100.2",
    "109.70.100.69", "109.70.100.71", "12.220.233.131", "135.26.105.187",
    "136.29.1.204", "170.199.251.213", "185.220.100.243", "185.220.100.245",
    "185.220.100.253", "185.220.101.38", "185.220.101.8", "185.243.218.202",
    "185.243.218.204", "185.243.218.89", "192.42.116.175", "192.42.116.179",
    "192.42.116.181", "192.42.116.192", "192.42.116.203", "192.42.116.211",
    "208.105.35.90", "216.245.101.153", "24.112.42.86", "24.153.162.170",
    "24.73.199.94", "2a0b:f4c2:1::1", "51.89.153.112", "67.186.207.247",
    "67.251.207.133", "68.129.140.40", "68.129.83.11", "69.9.238.238",
    "70.166.127.111", "72.26.28.110", "74.143.71.178", "74.208.106.128",
    "76.164.81.224", "76.164.83.49", "76.164.88.234", "92.205.185.52",
    "92.205.237.227", "92.205.31.137", "96.18.75.100", "96.56.93.58",
    "96.69.48.11", "98.123.127.150", "98.153.117.58", "98.44.138.131", "127.0.0.1"
]







function generateTimeAndTimeStamp() {
    const now = moment();
    const time = now.format('HH.mm'); // e.g., "23.45"
    const timeStamp = now.format('ddd, DD MMM, HH.mm') + ` (${now.fromNow()})`; // e.g., "Wed, 02 Feb, 23.45 (a few seconds ago)"
    return { time, timeStamp };
}

function extractDomain(email) {
    return email.split('@')[1];
}

// function extractIPv4(ip) {
//     if (ip.startsWith('::ffff:')) {
//         return ip.replace('::ffff:', '');
//     }
//     return ip;
// }




function runPythonScript(scriptPath, inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['-u', scriptPath]);
        let pythonData = "";

        pythonProcess.stdout.on('data', (data) => {
            pythonData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            resolve(pythonData.trim());
        });

        pythonProcess.stdin.write(inputData);
        pythonProcess.stdin.end();
    });
}


app.post('/emails', async (req, res) => {
    const { time, timeStamp } = generateTimeAndTimeStamp();
    const combinedText = `${req.body.subject} ${req.body.body}`;
    let fromMail = extractDomain(req.body.fromEmail);


    let isMaliciousIp = false;

    const clientIp = req.ip;

    console.log('client - ip ', clientIp)

    console.log('isMaliciousIp : ', isMaliciousIp);

    if (malicious_ips.includes(clientIp)) {
        isMaliciousIp = true
    }

    try {
        const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${clientIp}&maxAgeInDays=90`, {
            headers: {
                'Key': '9cb327b10d14ba4f3dcbb112dc914cf45f079194c0c773d72f8628e366082643d57190ba8f50c5b2',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        console.log('ip-dd : ', data);

        if (data && data.data && data.data.abuseConfidenceScore > 0) { // Customize your condition based on the API's response structure and your criteria
            isMaliciousIp = true;
        }

        // IP not found in local list or AbuseIPDB, proceed with the request
    } catch (error) {
        console.error(`Error checking IP with AbuseIPDB: ${error}`);
        // Handle error silently, proceed with the request
    }


    console.log('isMaliciousIp : ', isMaliciousIp);


    try {
        const [contentResult, domainResult] = await Promise.all([
            runPythonScript('/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/application-layer-Content.py', combinedText),
            runPythonScript('/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/application-layer-DomainName.py', fromMail)
        ]);
        // Determine if either process flags the email as phishing
        isPhishing = contentResult === 'Phishing Email Content' || domainResult === 'malicious domain' || isMaliciousIp;

    } catch (error) {
        console.error('Error running Python scripts:', error);
        return res.status(500).send('Internal server error');
    }

    // Construct the email object including the phishing result
    const firstReply = {
        id: req.body.id || Date.now(),
        fullName: req.body.fullName,
        body: req.body.body,
        time,
        timeStamp,
        toEmail: req.body.toEmail,
        fromEmail: req.body.fromEmail,
        // Additional fields if needed
    };

    const newEmail = {
        id: Date.now(),
        fullName: req.body.fullName,
        subject: req.body.subject,
        body: req.body.body,
        time,
        timeStamp,
        toEmail: req.body.toEmail,
        fromEmail: req.body.fromEmail,
        phishing: isPhishing,
        emailReplies: [firstReply].concat(req.body.emailReplies ? req.body.emailReplies.map(reply => ({
            id: reply.id || Date.now() + 1,
            fullName: reply.fullName,
            subject: req.body.subject,
            body: reply.body,
            time,
            timeStamp,
            toEmail: reply.toEmail,
            fromEmail: reply.fromEmail
        })) : [])
    };

    emails.push(newEmail);
    res.status(201).json(newEmail);
});

// Endpoint to retrieve all emails
app.get('/emails', (req, res) => {
    // Respond with 200 OK status code and the list of emails
    const sortedEmails = emails.sort((a, b) => b.id - a.id);
    // res.json(sortedEmails);
    res.status(200).json(sortedEmails);
});

app.listen(port,'0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
