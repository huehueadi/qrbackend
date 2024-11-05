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
        origin: 'http://localhost:3000', // Allow requests from this origin
        methods: ['GET', 'POST'], // Allowed methods
        credentials: true // Allow credentials
    }
});

const PORT = 7000;

app.use(cors({
    origin: 'https://qrfrontend.onrender.com', 
    methods: ['GET', 'POST', 'PUT'], 
}));

app.use(express.json());

app.use('/api', router);

io.on('connection', (socket) => {
    console.log("New connection established");

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});
export { io };
// Connect to the database
connectionDatabase();

// Start the server
server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
