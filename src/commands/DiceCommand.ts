import { ICommand, Command } from "discbot-factory";

export default class DiceCommand implements ICommand {
  public readonly name: string = "dice";
  public readonly description: string = "";
  
  public async execute(command: Command): Promise<void> {
    const nbr: number = Math.round(Math.random() * 6);

    command.message.reply(`🎲: ${nbr}`);
  }
}
