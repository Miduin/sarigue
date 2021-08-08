import { ICommand, Command } from "discbot-factory";
import fetch, { Response } from "node-fetch";

export default class CurrencyCommand implements ICommand {
  public readonly name: string = "c";
  public readonly description: string = "";

  public async execute(command: Command): Promise<void> {
    const quantity: number = Number(command.args[0]);
    const left: string = command.args[1].toLowerCase();
    const right: string = command.args[2].toUpperCase();

    const response: Response = await fetch(
      `http://${left}.rate.sx/${quantity}${right}`
    );
    const currency: number = Number(await response.text());

    command.message.reply(`💱: ${currency.toFixed(2)}`);
  }
}
