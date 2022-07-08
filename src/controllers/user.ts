import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../daos';
import bcrypt from 'bcrypt';
import { unlink } from 'fs/promises';
import { sendMail } from '../utils/sendMail';

export const signUp: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (req.file) {
        await unlink(req.file.path);
      }

      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.getByEmail(req.body.email);

    if (existingUser) {
      if (req.file) {
        await unlink(req.file.path);
      }
      return res.status(400).json({
        error: 'Email ya registrado',
      });
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      address: req.body.address,
      age: req.body.age,
      email: req.body.email,
      picture: req.file?.filename || 'temporary string',
      tel: req.body.tel,
      name: req.body.name,
      password: hash,
    });

    await sendMail({
      from: `${process.env.EMAIL_USER}`,
      to: process.env.DEST_EMAIL,
      subject: 'Nuevo registro',
      text: JSON.stringify(user),
    });

    return res.json({
      message: `Usuario creado con ${req.body.email}`,
    });
  } catch (error) {
    console.log(error);

    res.json({ message: 'algo salio mal', error });
  }
};

export const signOut: RequestHandler = async (req, res) => {
  if (!req.user) return res.json({ message: 'No hay usuario conectado' });
  const email = (req.user as any).email;
  req.logout((error) => {
    if (error) return;
    return res.render('logout', { title: 'Logout', name: email });
  });
};

export const signIn: RequestHandler = async (req, res) => {
  res.json({ message: 'Conectado exitosamente! ' });
};
