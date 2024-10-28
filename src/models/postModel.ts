import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  allowImage: { type: Boolean, required: true },
  allowVideo: { type: Boolean, required: true },
  allowText: { type: Boolean, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Post', postSchema);
