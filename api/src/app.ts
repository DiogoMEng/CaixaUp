import express from 'express';
import cors from 'cors';
import router from './routes/indexRouter.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json';
import { errorHandler } from '#middlewares/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:8080',
  }),
);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(express.urlencoded({ extended: true }));

router(app);

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found.` });
});

app.use(errorHandler);

export default app;
