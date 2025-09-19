import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import UserRoute from './routes/user.routes';
import { swaggerSpec, swaggerUi } from './swagger/swaggerConfig';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize routes
const userRoute = new UserRoute();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ 
        message: 'MyContacts API',
        status: 'Running',
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// User route
app.use('/', userRoute.router);

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
            console.log(`Server is running on port ${PORT}`);
            console.log(`API URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();