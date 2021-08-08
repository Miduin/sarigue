import { ICommand, Command, Voice, Queue } from "discbot-factory";
import { VoiceChannel, TextChannel } from "discord.js";
import ytsr from "ytsr";

export default class MusicCommand implements ICommand {
  public readonly name: string = "m";
  public readonly description: string = "";

  private validArguments: Array<string> = [
    "pause",
    "resume",
    "stop",
    "skip",
    "queue",
  ];

  private voice: Voice = new Voice("youtube");
  private queue: Queue<string> = new Queue();

  public async execute(command: Command): Promise<void> {
    const voiceChannel: VoiceChannel = command.message.member?.voice.channel!;
    const argument: string = command.args.join(" ");

    if (!this.validArguments.includes(argument)) {
      await this.addToQueue(argument);
      await this.playMusic(voiceChannel, () =>
        this.showCurrentMusic(command.message.channel as TextChannel)
      );
    } else {
      switch (argument) {
        case "pause":
          this.voice.pause();
          break;
        case "resume":
          this.voice.resume();
          break;
        case "stop":
          this.voice.disconnect();
          break;
        case "queue":
          const allMusics: Array<string> = this.queue.getAll();

          command.message.channel.send(allMusics.join("\n"));
          break;
        case "skip":
          this.voice.destroy();
          this.queue.removeHead();

          await this.playMusic(voiceChannel, () =>
            this.showCurrentMusic(command.message.channel as TextChannel)
          );
          break;
        default:
          break;
      }
    }

    this.voice.onEnd(async () => {
      this.queue.removeHead();

      if (this.queue.getAll().length) {
        await this.playMusic(voiceChannel, () =>
          this.showCurrentMusic(command.message.channel as TextChannel)
        );
      }
    });
  }

  private async addToQueue(music: string): Promise<void> {
    if (music.startsWith("https://")) {
      this.queue.putOnBottom(music);
    } else {
      const results: any = await ytsr(music);
      const url: string = results.items[0].url;

      this.queue.putOnBottom(url);
    }
  }

  private async playMusic(
    voiceChannel: VoiceChannel,
    cb?: () => void
  ): Promise<void> {
    await this.voice.connect(voiceChannel);
    await this.voice.play(this.queue.get());

    if (cb) cb();
  }

  private showCurrentMusic(channel: TextChannel): void {
    channel.send(`Tocando: ${this.queue.get()}`);
  }
}
