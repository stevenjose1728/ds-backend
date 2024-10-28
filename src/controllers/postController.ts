import { Request, Response } from 'express';
import PostModel from '../models/postModel';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const post = new PostModel({ ...req.body, author: req.user?.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el post', error });
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate('category');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error });
  }
};
export const getPostById = async (req: Request, res: Response) => {
  try {
    console.log('>>: req', req.query, req.params)
    const posts = await PostModel.findById(req.query.id).populate('category');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error });
  }
};
