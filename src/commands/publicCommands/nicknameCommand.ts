import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class NickCommand extends Command {
  public constructor() {
    super('nickname', {
      aliases: ['nickname', 'nick'],
      category: 'Public Command',
      description: {
        content: 'Returns nick',
        usage: 'nickname',
        examples: ['nickname', 'nick'],
      },
      channel: 'guild'
    });
  }

  public exec(message: Message): Promise<Message> | void {
    return message.util?.reply(`Your nickname is: ${message.member?.nickname}`);
  }
}
