import { Request, Response } from 'express';
import CategoryModel from '../models/categoryModel'
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const createCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const post = new CategoryModel({ ...req.body, author: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const posts = await CategoryModel.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting data', error });
  }
};