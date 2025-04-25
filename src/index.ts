import 'reflect-metadata';
import 'module-alias/register';
import { Request, Response, NextFunction } from 'express';
import http from 'http';
import express from 'express';
import { setupSwagger } from './config/swagger';
import { AppDataSource } from './infrastructure/data-source';
import router from './routes/routes';
import { setupSocketIO } from './config/socket';
import { registerDependencies } from './ioc/ioc';
import logger from './config/logger';
import { handleError } from './shared/middleware/handleError';

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = setupSocketIO(server);

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    logger.info('Database connection established successfully');
  })
  .catch((error) => {
    logger.error('Error during Data Source initialization:', error);
  });

// Register dependencies
registerDependencies();

app.use(express.json());

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).send('Internal Server Error');
});

// Setup Swagger documentation
setupSwagger(app);

// Register routes
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the LMS application!');
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Add the global error handler as the last middleware
app.use(handleError);

server.listen(PORT, () => {

  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;

