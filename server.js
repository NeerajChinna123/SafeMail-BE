const express = require('express');
const moment = require('moment'); // Ensure moment is installed
const app = express();
const port = 3001;
const cors = require('cors');
const { spawn, exec } = require('child_process');
const { NmapScan } = require('node-nmap');
const nodeNmap = require('node-nmap');

app.use(cors());
app.use(express.json());


// app.set('trust proxy', true);

// let emails = [];




let emails = [{
    id: 1,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    subject: 'Online Security Recommendation',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 11,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    },
    {
        id: 13,
        fullName: 'John Doe',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:20',
        timeStamp: 'Mon, 29 Jan, 23.20 (3 days ago)',
        toEmail: 'listLm@gmail.com',
        fromEmail: 'johnDoe@gmail.com',
    },
    {
        id: 14,
        fullName: 'John Doe',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:20',
        timeStamp: 'Mon, 29 Jan, 23.20 (3 days ago)',
        toEmail: 'listLm@gmail.com',
        fromEmail: 'johnDoe@gmail.com',
    },
    {
        id: 15,
        fullName: 'John Doe',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:20',
        timeStamp: 'Mon, 29 Jan, 23.20 (3 days ago)',
        toEmail: 'listLm@gmail.com',
        fromEmail: 'johnDoe@gmail.com',
    },
    {
        id: 16,
        fullName: 'John Doe',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:20',
        timeStamp: 'Mon, 29 Jan, 23.20 (3 days ago)',
        toEmail: 'listLm@gmail.com',
        fromEmail: 'johnDoe@gmail.com',
    }]
},
{
    id: 2,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 21,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 3,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 31,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 4,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 41,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 5,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 51,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 6,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 61,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 7,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 71,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 8,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 81,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 9,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 91,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 10,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 101,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 11,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 111,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 12,
    fullName: 'List Lmin',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 121,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 13,
    fullName: 'List Lmin',
    body: "Exciting news! We're thrilled to introduce the launch of Dimmu's Virtual Gallery. Now, you can dive into a world of art from the comfort of your home. Our new virtual platform brings you closer to exclusive art collections and exhibitions like never before. What's Inside? Explore immersive, 3D exhibitions at your own pace. Discover works by renowned and emerging artists from around the globe. Our interactive features let you learn about the artworks and their creators in depth. Join us on this artistic journey. Immerse yourself in the beauty and diversity of art with Dimmu's Virtual Gallery.",
    time: '23:26',
    subject: 'Exciting Update: Introducing johns Virtual Gallery!',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'listLm@gmail.com',
    emailReplies: [{
        id: 131,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'listLm@gmail.com',
    }]
},
{
    id: 14,
    fullName: 'Raj ',
    body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
    time: '23:26',
    subject: 'Online Security Recommendation',
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'Raj@gmail.com',
    emailReplies: [{
        id: 141,
        fullName: 'List Lmin',
        body: "Hi there! I've been thinking about improving my online security. Do you have any recommendations, Do you have any recommendations, Do you have any recommendations",
        time: '23:26',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'Raj@gmail.com',
    }]
},
{
    id: 15,
    fullName: 'Neeraj',
    phishing: true,
    body: "Dear Team, I hope this message finds you well. I'm reaching out to ensure we're on track with the action items discussed during our meeting on Monday. Could each responsible party provide a brief update on their progress by end of day Wednesday? This will help us stay aligned and address any potential hurdles early.<br>Thank you for your cooperation and dedication.</p><p>&nbsp;</p><p>&nbsp;</p><p>Best,onday's Meeting Action Items",
    time: '06:28',
    subject: "Follow-Up on Monday's Meeting Action Items",
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'Neeraj@gmail.com',
    emailReplies: [{
        id: 141,
        fullName: 'List Lmin',
        body: "Dear Team, I hope this message finds you well. I'm reaching out to ensure we're on track with the action items discussed during our meeting on Monday. Could each responsible party provide a brief update on their progress by end of day Wednesday? This will help us stay aligned and address any potential hurdles early.<br>Thank you for your cooperation and dedication.</p><p>&nbsp;</p><p>&nbsp;</p><p>Best,onday's Meeting Action Items",
        time: '06.28',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'Neeraj@gmail.com',
    }]
},
{
    id: 16,
    fullName: 'Rajeev',
    phishing: true,
    body: "Dear Team, I hope this message finds you well. I'm reaching out to ensure we're on track with the action items discussed during our meeting on Monday. Could each responsible party provide a brief update on their progress by end of day Wednesday? This will help us stay aligned and address any potential hurdles early.<br>Thank you for your cooperation and dedication.</p><p>&nbsp;</p><p>&nbsp;</p><p>Best,onday's Meeting Action Items",
    time: '06.55',
    subject: "Follow-Up on Monday's Meeting Action Items",
    timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
    toEmail: 'johnDoe@gmail.com',
    fromEmail: 'Rajeev@gmail.com',
    emailReplies: [{
        id: 141,
        fullName: 'List Lmin',
        body: "Dear Team, I hope this message finds you well. I'm reaching out to ensure we're on track with the action items discussed during our meeting on Monday. Could each responsible party provide a brief update on their progress by end of day Wednesday? This will help us stay aligned and address any potential hurdles early.<br>Thank you for your cooperation and dedication.</p><p>&nbsp;</p><p>&nbsp;</p><p>Best,onday's Meeting Action Items",
        time: '06.28',
        timeStamp: 'Mon, 29 Jan, 23.26 (3 days ago)',
        toEmail: 'johnDoe@gmail.com',
        fromEmail: 'Rajeev@gmail.com',
    }]
},
]


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
    "96.69.48.11", "98.123.127.150", "98.153.117.58", "98.44.138.131", "73.239.243.87"
]



const maliciousPorts = [
    4444, 20000, 32768, 32769, 32770, 32771, 32772, 32773, 32774, 32775
];

function isAnyPortMalicious(givenPorts) {
    return givenPorts.some(port => maliciousPorts.includes(port.port));
}


function generateTimeAndTimeStamp() {
    const now = moment();
    const time = now.format('HH.mm'); // e.g., "23.45"
    const timeStamp = now.format('ddd, DD MMM, HH.mm') + ` (${now.fromNow()})`;
    return { time, timeStamp };
}

function extractDomain(email) {
    return email.split('@')[1];
}


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

function generatePhishingWarning(contentResult, domainResult, isMaliciousIp, maliciousPort) {
    let reasons = []; // Array to hold reasons for flagging as phishing

    // Check each condition and add appropriate message to reasons array
    if (contentResult === 'Phishing Email Content') {
        reasons.push('the content matches known phishing patterns');
    }
    if (domainResult === 'malicious domain') {
        reasons.push('the email domain is known for malicious activities');
    }
    if (isMaliciousIp) {
        reasons.push('the sender\'s IP address is associated with malicious behavior');
    }
    if (maliciousPort) {
        reasons.push('the email contains links to malicious ports');
    }

    // Construct the final message based on the reasons
    let message = 'This email is flagged as phishing because ';
    if (reasons.length > 0) {
        // Concatenate all reasons, separated by commas, with "and" before the last reason
        message += reasons.join(', ').replace(/, ([^,]*)$/, ', and $1');
    } else {
        // Default message if no reasons are found (shouldn't happen in practice if the email is flagged)
        message += 'it triggered our phishing detection algorithms.';
    }

    return message;
}


app.post('/emails', async (req, res) => {
    const { time, timeStamp } = generateTimeAndTimeStamp();
    const combinedText = `${req.body.subject} ${req.body.body}`;
    let fromMail = extractDomain(req.body.fromEmail);
    let maliciousPort = false;
    let isMaliciousIp = false;
    let target1 = '127.0.0.1';

    const clientIp = req.body.usersIp;

    // console.log('client - ip ', clientIp)

    // console.log('isMaliciousIp : ', isMaliciousIp);

    const command = `sudo nmap -p- ${clientIp}`;

    nodeNmap.nmapLocation = "nmap";
    const target = clientIp;
    const options = "-p 1-65535";
    let message1 = '';
    const portScan = new nodeNmap.QuickScan(target1, options);

    portScan.on('complete', function (data) {
        console.log(`Scan complete for target: ${target1}`);
        console.log(`No Open ports on 127.0.0.1`);
        console.log(`Open Port -`);
        data?.forEach(host => {

            if (host.openPorts && host.openPorts.length > 0) {

                const openPorts = host.openPorts.map(portInfo => portInfo.port); // Extract just the port numbers
                host.openPorts.forEach(portInfo => {
                    console.log(`Port ${portInfo.port} (${portInfo.service})`);
                });
                // Check if any open ports are malicious
                if (isAnyPortMalicious(host.openPorts)) {
                    console.log(`Warning: At least one of the open ports on ${host.ip} is known to be used by malicious software.`);
                    maliciousPort = true;
                }
            } else {
                // console.log(`No open ports found on ${host.ip}.`);
            }
        });
    });

    portScan.on('error', function (error) {
        console.log(`Error: ${error}`);
    });

    portScan.startScan();

    if (malicious_ips.includes(clientIp)) {
        isMaliciousIp = true
    }

    try {
        const response = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${clientIp}&maxAgeInDays=90`, {
            headers: {
                'Key': process.env.NEXT_PUBLIC_API_ABUSE_IP_KEY,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        // console.log('ip-dd : ', data);

        if (data && data.data && data.data.abuseConfidenceScore > 0) {
            isMaliciousIp = true;
        }

        // IP not found in local list or AbuseIPDB, proceed with the request
    } catch (error) {
        console.error(`Error checking IP with AbuseIPDB: ${error}`);
        // Handle error silently, proceed with the request
    }

    try {
        const [contentResult, domainResult] = await Promise.all([
            runPythonScript('/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/application-layer-Content.py', combinedText),
            runPythonScript('/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/application-layer-DomainName.py', fromMail)
        ]);
        // Determine if either process flags the email as phishing
        isPhishing = contentResult === 'Phishing Email Content' || domainResult === 'malicious domain' || isMaliciousIp || maliciousPort;


        if (isPhishing) {
            message1 = generatePhishingWarning(contentResult, domainResult, isMaliciousIp, maliciousPort);
        } else {
            message1 = '';
        }
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
        phishMessage: message1,
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

// app.listen(port,'0.0.0.0', () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
