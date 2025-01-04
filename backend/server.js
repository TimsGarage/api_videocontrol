const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 6969;
const clients = [];

// Enable CORS for all routes or specific routes
app.use(cors());  // Enable CORS for all origins, or you can pass specific options

app.get('/events', (req, res) => {
    // Set appropriate headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Keep the client connection open by writing a comment or empty data if necessary
    res.write(': Keep connection open\n\n'); // Some servers require this to avoid timeouts

    // Add the client connection to the list
    clients.push(res);
    console.log('New client connected. Total clients:', clients.length);

    // Handle client disconnection
    req.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
        console.log('Client disconnected. Total clients:', clients.length);
    });
});

// Broadcast event to all connected clients
app.get('/broadcast/:target/:message', (req, res) => {
    // Broadcast an event to all clients
    broadcastEvent(req.params.target, { command: req.params.message });
    
    res.status(200).send('Broadcasted event to all clients');
});

// Function to send an event to all active clients
function broadcastEvent(target, data) {
    data.target = target;
    const payload = `event: command\ndata: ${JSON.stringify(data)}\n\n`;

    clients.forEach((client) => {
        try {
            client.write(payload); // Send data to each client
        } catch (error) {
            console.error('Error sending data to client:', error);
        }
    });

    console.log(`Broadcasted command: ${data.command}, to target: ${target}`);
}

// Start the server and listen on the given port
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
