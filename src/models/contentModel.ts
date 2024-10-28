import mongoose from 'mongoose';

const contentModel = new mongoose.Schema({
  content: { type: String, required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Content', contentModel);
