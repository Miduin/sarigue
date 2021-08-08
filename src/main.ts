import "dotenv/config";
import { Core } from "discbot-factory";

import MusicCommand from "./commands/MusicCommand";
import DiceCommand from "./commands/DiceCommand";
import CurrencyCommand from "./commands/CurrencyCommand";

const bot: Core = new Core("sarigue", "?", {
  commands: [new MusicCommand(), new DiceCommand(), new CurrencyCommand()],
  events: [],
  middlewares: [],
});

bot.authClient(process.env.TOKEN!);
