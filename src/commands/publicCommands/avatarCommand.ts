import { Command } from 'discord-akairo';
import { Message, GuildMember, MessageEmbed, ImageSize } from 'discord.js';
import { type } from 'os';

export default class AvatarCommand extends Command {
  public constructor() {
    super('avatar', {
      aliases: ['avatar'],
      category: 'Public Command',
      description: {
        content: 'Displays avatar of the member',
        usage:
          'avatar [member?] [-size, -s] [16, 32, 64, 128, 256, 512, 1024, 2048]',
        examples: [
          'avatar',
          'avatar @unputo#0001 -s 32',
          'avatar elputo -size 512',
        ],
      },
      args: [
        {
          id: 'member',
          type: 'member',
          match: 'rest',
          default: (msg: Message) => msg.member,
        },
        {
          id: 'size',
          type: (_: Message, str: string): null | Number => {
            if (
              str &&
              !isNaN(Number(str)) &&
              [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))
            ) {
              return Number(str);
            } else {
              return null;
            }
          },
          match: 'option',
          flag: ['-s', '-size'], // avatar @user#0001 -size=2048
          default: 2048,
        },
      ],
    });
  }

  public exec(
    message: Message,
    { member, size }: { member: GuildMember; size: number }
  ): Promise<Message> | void {
    return message.util?.send(
      new MessageEmbed()
        .setTitle(`Avatar | ${member.user.tag}`)
        .setColor('RANDOM')
        .setImage(member.user.displayAvatarURL({ size: size as ImageSize }))
    );
  }
}
