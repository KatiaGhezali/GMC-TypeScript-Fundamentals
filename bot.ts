import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();


const botToken = process.env.SLACK_BOT_TOKEN;
const appToken = process.env.SLACK_APP_TOKEN;


if (!botToken || !appToken) {
  throw new Error(
    "Missing Slack tokens. Check your .env file."
  );
}


const app = new App({
  token: botToken,
  appToken: appToken,
  socketMode: true,
});

// Handle the /hello command
app.command("/hello", async ({ ack, respond }) => {
  await ack();

  await respond("Hello! 👋 I'm your TypeScript Slack bot.");
});


app.event("message", async ({ event, logger }) => {
  if ("text" in event && typeof event.text === "string") {
    logger.info(`Message received: ${event.text}`);
  }
});

// Start the bot
(async () => {
  await app.start();
  console.log("⚡️ Slack bot is running!");
})();
