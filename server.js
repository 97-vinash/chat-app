const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static HTML file
app.use(express.static('public'));

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining with a username and gender
    socket.on('user joined', (data) => {
        console.log(`${data.username} joined the chat with gender ${data.gender}`);
        socket.username = data.username; // Save the username to the socket instance
        socket.gender = data.gender; // Save gender info to the socket instance
    });


    socket.on('chat message', (data) => {
        io.emit('chat message', { username: data.username, message: data.message, gender: data.gender });
    });


    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
