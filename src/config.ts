import dotenv from 'dotenv';
dotenv.config();

export const token: string = process.env.TOKEN ?? '';
export const prefix: string = process.env.PREFIX ?? '';
export const owners: string[] = process.env.OWNERS?.split(' ') ?? [];
