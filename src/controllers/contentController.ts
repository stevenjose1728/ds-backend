import { Request, Response } from 'express';
import CategoryModel from '../models/categoryModel'
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import ContentModel from '../models/contentModel';

export const createContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const post = new ContentModel({ ...req.body, author: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const getContents = async (req: Request, res: Response) => {
  try {
    const posts = await ContentModel.find({ topic: req.query.topic }).populate('topic');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting data', error });
  }
};