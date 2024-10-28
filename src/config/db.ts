import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gestor_contenido');
    console.log('MongoDB online');
  } catch (err) {
    console.error('connection error:', err);
    process.exit(1);
  }
};
export default connectDB;
