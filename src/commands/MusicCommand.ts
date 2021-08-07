import { ICommand, Command, Voice, Queue } from "discbot-factory";

export default class MusicCommand implements ICommand {
    public readonly name: string = "m";
    public readonly description: string = "";

    private voice: Voice = new Voice("youtube");
    private queue: Queue<string> = new Queue();
    
    public async execute(command: Command): Promise<void> {
        this.queue.putOnTop(command.args[0]);

        await this.voice.connect(command.message.member?.voice.channel!);
        await this.voice.play(this.queue.get());

        console.log(this.queue.getAll());

        this.voice.onEnd(() => {
            this.queue.removeHead();

            if (this.queue.getAll().length) {
                this.execute(command);
            }
        });
    }
}