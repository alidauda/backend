import { Request, Response } from 'express';
import { db } from '../utils/db';
import bcrypt from 'bcrypt';
import { creeateJwt } from '../modules/auth';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../index';
import { sendMail } from '../utils/sendMail';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password.length < 6) {
      res
        .status(400)
        .json({ message: 'password must be greater than 6 characters' });
      return;
    }
    const user = await db.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      },
    });
    const token = creeateJwt(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'user already exist please try again ' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    const isValid = await bcrypt.compare(
      req.body.password,
      user?.password!.toString()!
    );
    if (!isValid) {
      res.status(401).json({ message: 'email or password is incorrect' });
      return;
    }
    const token = creeateJwt(user!);
    res.json({ token });
  } catch (e) {
    res.json({ message: 'user not found' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.json({ user });
  } catch (e) {
    res.status(404).json({ message: 'unauthorized' });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  if (req.body.email || req.body.password) {
    res
      .status(400)
      .json({ message: "you can't update your email or password" });
    return;
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    const updatedUser = await db.user.update({
      where: {
        id: req.user.id,
      },
      data: req.body,
    });
    res.json({ updatedUser });
  } catch {
    res.status(501).json({ message: 'something went wrong please try again ' });
    return;
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    const token = uuidv4();
    const data = await sendMail('alidauda14@gmail.com', token);
    await client.set(token, user.id, 'EX', 1000 * 60 * 60 * 24 * 3);
    res.json({ token, data });
  } catch (e) {
    console.log(e);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const userId = await client.get(req.body.token);
  if (!userId) {
    res.status(404).json({ message: 'token not found' });
    return;
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    res.status(404).json({ message: 'user not found' });
    return;
  }
  const newPPassword = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(req.body.password, 10),
    },
  });
  res.json({ message: newPPassword });
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.json({ user });
  } catch (e) {
    res.status(404).json({ message: 'user not found' });
  }
};
export const logout = async (req: Request, res: Response) => {
  req.user = null;
  res.json({ message: 'logout success' });
};

// Exclude keys from user
