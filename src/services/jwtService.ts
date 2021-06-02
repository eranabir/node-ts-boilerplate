import jwt from 'jsonwebtoken';

export const generateToken = (data: any, expiresIn: string = '1d') => jwt.sign({data}, process.env.JWT_SECRET, {expiresIn});

export const verifyToken = (token:string) => jwt.verify(token, process.env.JWT_SECRET);

