import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
  defaultPrefix: "!",
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", (message) => {
  console.log(`[RECEIVED]: ${message.content}`);
});
