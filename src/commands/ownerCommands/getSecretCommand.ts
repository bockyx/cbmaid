import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class GetSecretCommand extends Command {
  public constructor() {
    super('getSecret', {
      aliases: ['getsecret', 'gst'],
      category: 'Owner Command',
      description: {
        content: 'test owner only command',
        usage: 'gst',
        examples: ['gst'],
      },
      ownerOnly: true,
      channel: 'guild'
    });
  }

  public exec(message: Message): Promise<Message> | void {
    return message.util?.send(`putote`);
  }
}
