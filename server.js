const express = require('express');
const moment = require('moment'); // Ensure moment is installed
const app = express();
const port = 3001;
const cors = require('cors');
const { spawn } = require('child_process');


app.use(cors());
app.use(express.json());

let emails = [];

function generateTimeAndTimeStamp() {
    const now = moment();
    const time = now.format('HH.mm'); // e.g., "23.45"
    const timeStamp = now.format('ddd, DD MMM, HH.mm') + ` (${now.fromNow()})`; // e.g., "Wed, 02 Feb, 23.45 (a few seconds ago)"
    return { time, timeStamp };
}

// Endpoint to add a new email
app.post('/emails', (req, res) => {
   

    const { time, timeStamp } = generateTimeAndTimeStamp();
    const combinedText = `${req.body.subject} ${req.body.body}`;

    // Spawn the Python process for prediction
    const pythonProcess = spawn('python3', ['-u','/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/application-layer-dp.py']);
    let pythonData = "";
    let isPhishing = false;

    pythonProcess.stdout.on('data', (data) => {
        pythonData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        // Here we assume the Python script writes '1' for phishing and '0' for legitimate
        console.log('pdata : ',typeof(pythonData));
        if(pythonData.trim() === '[1]') {
            isPhishing = true;
        }
        console.log('isPhishing : ', isPhishing);
        const firstReply = {
            id: req.body.id || Date.now(),
            fullName: req.body.fullName,
            body: req.body.body,
            time,
            timeStamp,
            toEmail: req.body.toEmail,
            fromEmail: req.body.fromEmail
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

    pythonProcess.stdin.write(combinedText);
    pythonProcess.stdin.end();



});

// Endpoint to retrieve all emails
app.get('/emails', (req, res) => {
    // Respond with 200 OK status code and the list of emails
    const sortedEmails = emails.sort((a, b) => b.id - a.id);
    // res.json(sortedEmails);
    res.status(200).json(sortedEmails);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
