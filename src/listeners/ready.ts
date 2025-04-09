import { Listener } from "@sapphire/framework";

export class ReadyListener extends Listener {
  public run() {
    console.log("\nBot is ready!");
  }
}
