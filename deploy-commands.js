import { REST, Routes } from "discord.js";

// utility
import * as pingCommand from "./commands/utility/ping.js";
import * as serverCommand from "./commands/utility/server.js";
import * as userCommand from "./commands/utility/user.js";

// message
import * as announceCommand from "./commands/message/announce.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;

const commandsList = [pingCommand, serverCommand, userCommand, announceCommand];
const validatedCommands = [];

// Validate commands from commandsList
commandsList.forEach((command) => {
  if ("data" in command && "execute" in command) {
    validatedCommands.push(command.data);
  } else {
    console.log(
      `[WARNING] The command ${command} is missing a required "data" or "execute" property.`
    );
  }
});

const rest = new REST().setToken(token);

// Deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${validatedCommands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: validatedCommands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );

    validatedCommands.forEach((command) => console.log(`  - ${command.name}`));
  } catch (error) {
    console.error(error);
  }
})();

// // delete a specific commands
// rest
//   .delete(Routes.applicationCommand(clientId, "commandId"))
//   .then(() => console.log("Successfully deleted application command"))
//   .catch(console.error);

// // delete all commands
// rest
//   .put(Routes.applicationCommands(clientId), { body: [] })
//   .then(() => console.log("Successfully deleted all application commands."))
//   .catch(console.error);
