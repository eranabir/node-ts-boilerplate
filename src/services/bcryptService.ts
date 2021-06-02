import bcrypt from "bcryptjs";
export const hash = (password:string) => bcrypt.hashSync(password, 8);
export const compare = (password:string, hashPassword:string) => bcrypt.compareSync(password, hashPassword);
