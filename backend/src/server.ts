import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database';
import router from './routes';
const app = express();
app.use(cors());
app.use(express.json());

// Инициализация базы данных
initializeDatabase().catch(err => console.error('Database initialization failed:', err));

// Использование роутов API
app.use('/api', router);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(3000, () => console.log('Backend running on 3000'));
