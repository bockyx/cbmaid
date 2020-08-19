import dotenv from 'dotenv';
dotenv.config();

// Importing variables from dotenv
export const token: string = process.env.TOKEN ?? '';
export const prefix: string = process.env.PREFIX ?? '';
export const owners: string[] = process.env.OWNERS?.split(' ') ?? [];
