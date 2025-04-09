import { Listener } from "@sapphire/framework";
import {
  type Message,
  TextChannel,
  NewsChannel,
  ThreadChannel,
} from "discord.js";
import { getOpenAiResponse } from "../lib/openai";

export class EmbedListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options
  ) {
    super(context, {
      ...options,
      event: "messageCreate",
    });
  }

  public async run(message: Message) {
    const TARGET_USER_ID = "1359540812836376580";
    if (message.author.id !== TARGET_USER_ID) return;

    if (!message.embeds || message.embeds.length === 0) return;
    console.log(`[RECEIVED]: ${message.author.id}`);

    console.log(`Got an embed from ${message.author.tag}`);
    console.log(`[EMBEDS]: ${message.embeds}`);
    message.embeds.forEach((embed, i) => {
      console.log(`Embed #${i + 1}:`, embed.toJSON());
    });

    console.log(`[DESCRIPTION]: ${message.embeds[0].description}`);

    let openAiResponse = "";

    if (message.embeds[0].description) {
      openAiResponse = await getOpenAiResponse(message.embeds[0].description);
      console.log(`[OPENAI RESPONSE]: ${openAiResponse}`);

      const channel = await message.client.channels.fetch(
        "1359559780741677087"
      );

      if (
        channel instanceof TextChannel ||
        channel instanceof NewsChannel ||
        channel instanceof ThreadChannel
      ) {
        const embed = message.embeds[0].toJSON();
        embed.footer = {
          text: `Today at ${new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
          })}`,
        };

        await channel.send({
          embeds: [embed],
        });

        await channel.send(openAiResponse);
      } else {
        console.error(
          "Channel is not a text-based channel that supports sending messages."
        );
      }
    }
  }
}
