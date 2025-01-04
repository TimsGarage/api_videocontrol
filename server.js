const express = require('express');
const app = express();
const PORT = 6969;
const clients = [];

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);
    console.log('New client connected. Total clients:', clients.length);

    req.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
        console.log('Client disconnected. Total clients:', clients.length);
    });
});

app.get('/broadcast/:target/:message', (req, res) => {
    // Broadcast an event to all clients
    broadcastEvent(req.params.target, { command: req.params.message } );

    res.status(200).send('Broadcasted event to all clients');
});

// Function to send an event to all active clients
function broadcastEvent(target, data) {
    data.target = target;
    const payload = `event: command\ndata: ${JSON.stringify(data)}\n\n`;

    clients.forEach((client) => {
        client.write(payload);
    });

    console.log(`Broadcasted command: ${data.command}, to target: ${target}`);
}

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

// Export the broadcast function for external use
// module.exports = { broadcastEvent };
