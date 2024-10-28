import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const user = new UserModel({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'default_secret');
    res.json({ message: 'Login exitoso', token, user });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};
