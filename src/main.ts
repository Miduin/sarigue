import "dotenv/config";
import { Core } from "discbot-factory";

import MusicCommand from "./commands/MusicCommand";
import DiceCommand from "./commands/DiceCommand";

const bot: Core = new Core("sarigue", "?", {
    commands: [new MusicCommand(), new DiceCommand()],
    events: [],
    middlewares: [],
});

bot.authClient(process.env.TOKEN!);