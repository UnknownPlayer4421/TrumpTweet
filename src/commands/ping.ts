import { Command } from "@sapphire/framework";
import type { Message } from "discord.js";

console.log("Ping command file loaded");

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      aliases: ["pong"],
      description: "ping pong",
    });
  }

  public async messageRun(message: Message) {
    if (!message.channel || !("send" in message.channel)) {
      return;
    }

    console.log(`Ping command executed by ${message.author.tag}`);

    const msg = await message.channel.send("Pinging...");

    const content = `Pong from JavaScript! Bot Latency ${Math.round(
      this.container.client.ws.ping
    )}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`;

    return msg.edit(content);
  }
}
