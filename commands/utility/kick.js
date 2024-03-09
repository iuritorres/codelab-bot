import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Select a member and kick them.")
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption((option) => {
    option
      .setName("target")
      .setDescription("The member to kick")
      .setRequired(true);
  });

async function execute(interaction) {
  await interaction.reply("Kicked!");
}

export { data, execute };
