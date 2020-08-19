import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Guild } from 'discord.js';
import editionModel, { IEdition } from '../../utils/models/edition.model';
import hgCharModel, { IHGChar } from '../../utils/models/hg-char.model';

export default class EditionCommand extends Command {
  private edition_docs: IEdition[] = new Array<IEdition>();
  private months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public constructor() {
    super('edition', {
      aliases: ['edition', 'ed'],
      category: 'Public Command',
      description: {
        content: `CB's HG editions`,
        usage: 'edition',
        examples: ['edition', 'ed'],
      },
      args: [
        {
          id: 'verbose',
          match: 'flag',
          flag: ['-v', '-verbose'],
        },
        {
          id: 'addWinner',
          match: 'option',
          flag: ['-w', '-winner'],
          type: 'string',
        },
        {
          id: 'edition',
          match: 'option',
          flag: ['-e', '-edition'],
          type: 'string',
        },
      ],
    });
  }

  private buildVerbose(docs: IEdition[], msg: Message) {
    let _msgEmb = new MessageEmbed();
    _msgEmb
      .setTitle(`Hunger Games`)
      .setDescription(
        'Vista detallada de ediciones de Hunger Games del server CB \nNumero total: **' +
          docs.length +
          '**'
      )
      .setThumbnail(
        msg.guild?.iconURL({
          format: 'gif' || 'png',
        }) || ''
      );
    let list = '';
    let i = 1;
    docs.forEach((doc) => {
      // prettier-ignore
      list =list + '- Edicion ' + i + ' (' +
        this.getMonth(doc.month, 3, true) +
        ' - ' + doc.year + ') \n';
      i++;
    });
    _msgEmb.addField('Lista de ediciones:', list);

    return _msgEmb;
  }

  private getMonth(pos: number, size: number, upper: boolean): string {
    return upper
      ? this.months[pos - 1].substr(0, size).toUpperCase()
      : this.months[pos - 1].substr(0, size);
  }

  private async getAllData() {
    await editionModel.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        this.edition_docs = docs;
      }
    });
  }

  private async registerWinner(_edition: string, _winner: string) {
    console.log(_edition + ' : ' + _winner);
    let _msg: string = '';
    let char: IHGChar | null;
    char = await hgCharModel.findOne({ name: _winner }, (err, doc) => {
      if (err) {
        console.log('not found');
        _msg = 'error1';
      } else {
        console.log(doc);
        return doc;
      }
    });
    if (char !== null || undefined) {
      await editionModel.findOneAndUpdate(
        { edition: +_edition },
        { winner_id: char?.id },
        (err, doc) => {
          if (err) {
            console.log('error2');
            _msg = 'error2';
            console.log(err);
          } else {
            console.log('entro a editar');
            console.log(doc);
            _msg =
              'Added ' +
              char?.name +
              ' as winner of the HG edition: ' +
              _edition;
          }
        }
      );
    }
    return _msg;
  }

  public async exec(
    message: Message,
    {
      verbose,
      addWinner,
      edition,
    }: { verbose: boolean; addWinner: string; edition: string }
  ): Promise<any> {
    await this.getAllData();
    if (addWinner) {
      const msg =
        (await this.registerWinner(edition, addWinner)) ||
        'fallo por que no se lol';
      console.log('message: ' + msg);
      return message.util?.send(msg);
    } else if (verbose) {
      return message.util?.send(this.buildVerbose(this.edition_docs, message));
    } else {
      return message.util?.send(
        'Numero de ediciones: ' + this.edition_docs.length
      );
    }
  }
}
