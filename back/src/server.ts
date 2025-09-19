import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.json({ 
        message: 'MyContacts Backend API',
        status: 'Running',
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

// TODO: Add your routes here
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDatabase();
        
        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📱 API URL: http://localhost:${PORT}`);
            console.log(`🔍 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();