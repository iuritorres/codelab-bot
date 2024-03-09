import { Client, Collection, GatewayIntentBits } from "discord.js";

// utility
import * as pingCommand from "./commands/utility/ping.js";
import * as serverCommand from "./commands/utility/server.js";
import * as userCommand from "./commands/utility/user.js";

// message
import * as announceCommand from "./commands/message/announce.js";

// events
import * as interactionCreateEvent from "./events/interactionCreate.js";
import * as readyEvent from "./events/ready.js";

const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Set up commands
const commands = [pingCommand, serverCommand, userCommand, announceCommand];

commands.forEach((command) => {
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command ${command} is missing a required "data" or "execute" property.`
    );
  }
});

// Set up events
const events = [readyEvent, interactionCreateEvent];

events.forEach((event) => {
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});

client.login(token);
