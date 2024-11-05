import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectionDatabase from './src/config/dbConnect.js';
import router from './src/routes/authroutes.js';

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'https://qrfrontend.onrender.com', // No trailing slash
        methods: ['GET', 'POST', 'PUT'],
        credentials: true, // Allow credentials
    }
});

// Use dynamic port assignment for Render
const PORT = process.env.PORT || 7000; // Use Render's dynamic port or 7000 locally

// Enable CORS for Express
app.use(cors({
    origin: 'https://qrfrontend.onrender.com', // No trailing slash
    methods: ['GET', 'POST', 'PUT'],
}));

app.use(express.json());

// Define routes
app.use('/api', router);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log("New connection established");

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

// Connect to the database
connectionDatabase();

// Start the server
server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
