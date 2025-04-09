import { Listener } from "@sapphire/framework";
import {
  type Message,
  TextChannel,
  NewsChannel,
  ThreadChannel,
} from "discord.js";
import { getOpenAiResponse } from "../lib/openai";
import { DateTime } from "luxon";

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
    if (message.author.id !== process.env.TWEETSHIFT_USER_ID) return;

    if (!message.embeds || message.embeds.length === 0) return;

    console.log(`Got an embed from ${message.author.tag}`);
    message.embeds.forEach((embed, i) => {
      console.log(`Embed #${i + 1}:`, embed.toJSON());
    });

    let openAiResponse = "";

    if (message.embeds[0].description) {
      openAiResponse = await getOpenAiResponse(message.embeds[0].description);
      console.log(`[OPENAI RESPONSE]: ${openAiResponse}`);

      const channel = await message.client.channels.fetch(
        process.env.DISCORD_CHANNEL_ID ??
          (() => {
            throw new Error(
              "DISCORD_CHANNEL_ID is not set in the environment variables."
            );
          })()
      );

      if (
        channel instanceof TextChannel ||
        channel instanceof NewsChannel ||
        channel instanceof ThreadChannel
      ) {
        const embed = message.embeds[0].toJSON();
        const nyTime = DateTime.now().setZone("America/New_York");

        embed.footer = {
          text: `🚨 Discord X Bot | NY Time: ${nyTime.toFormat("HH:mm:ss")}`,
        };

        embed.timestamp = nyTime.toISO() ?? "";

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
