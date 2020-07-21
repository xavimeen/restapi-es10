import express from 'express';

const app = express();

// Importando routes
import IndexRoutes from './routes/index.routes';
import TaskRoutes from './routes/tasks.routes';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(IndexRoutes);
app.use('/tasks', TaskRoutes);

export default app;