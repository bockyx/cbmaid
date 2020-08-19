// Ping Command

import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
  public constructor() {
    super('ping', {
      aliases: ['ping'],
      category: 'Public Command',
      description: {
        content: 'Ping server',
        usage: 'ping',
        examples: ['ping'],
      },
    });
  }

  public exec(message: Message): Promise<Message> | void {
    return message.util?.send(`Ping: \`${this.client.ws.ping}ms\``);
  }
}
