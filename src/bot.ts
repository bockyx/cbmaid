// Main TS file, on build bot.ts => bot.js

// Imports
import { token, owners } from './config';
import BotClient from './client/botClient';

// Start Client
const client: BotClient = new BotClient({ token, owners });
client.start();
