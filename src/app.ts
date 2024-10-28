import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import categoryRoutes from './routes/categoryRoutes';
import seedAdmin from './seeders/adminSeeder';
import contentRoutes from './routes/contentRoutes';
dotenv.config();
connectDB();
seedAdmin();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/content', contentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server initialized ${PORT}`));
