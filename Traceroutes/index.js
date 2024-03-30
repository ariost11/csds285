const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/traceroute', (req, res) => {
    const destination = req.query.destination;
    const command = `traceroute -m 40 -q 1 ${destination}`;

    const tracerouteProcess = exec(command);

    tracerouteProcess.stdout.on('data', data => {
        res.write(data); // Send each line of traceroute output to the client
    });

    tracerouteProcess.on('close', () => {
        res.end(); 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
