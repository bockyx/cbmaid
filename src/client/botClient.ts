// Discord Akairo main file

// Imports
import { owners, prefix } from './../config';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { User, Message } from 'discord.js';
import { join } from 'path';

// Discord Akairo
declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
  }
}

// Bot Options
interface BotOptions {
  token?: string;
  owners?: string | string[];
}

// Creating BotClient wrapped in Akairo
// TBH  I don't know what this shit is lmao
export default class BotClient extends AkairoClient {
  public config: BotOptions;
  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
  });
  public commandHandler: CommandHandler = new CommandHandler(this, {
    // Commands directory
    directory: join(__dirname, '..', 'commands'),
    // Prefix
    prefix: prefix,
    // Allows commands through mentions
    allowMention: true,
    // Allows Bot to handle commands on edited messages
    handleEdits: true,
    // nani?
    commandUtil: true,
    commandUtilLifetime: 3e5,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command`,
        modifyRetry: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command`,
        timeout: 'You took too long, th command has been canceled',
        ended: 'You exceeded the maximum amount of tries',
        cancel: 'Command cancelled',
        retries: 3,
        time: 3e4,
      },
      otherwise: '',
    },
    // Owners cheat mode (?)
    ignorePermissions: owners,
    ignoreCooldown: owners,
  });

  public constructor(config: BotOptions) {
    super({
      ownerID: config.owners,
    });

    this.config = config;
  }

  // Bruh no idea like loading modules I guess?
  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  // Starts means start (?)
  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }
}
