import { token, owners } from './config';
import BotClient from './client/botClient';

const client: BotClient = new BotClient({ token, owners });
client.start();
