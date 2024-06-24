import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("Select a member and ban them.")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .addUserOption((option) => {
    option
      .setName("target")
      .setDescription("The member to ban")
      .setRequired(true);
  })
  .addStringOption((option) =>
    option.setName("reason").setDescription("The reason for banning")
  );

async function execute(interaction) {
  const target = interaction.options.getUser("target");
  const reason =
    interaction.options.getString("reason") ?? "No reason provided";

  await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
  await interaction.guild.members.ban(target);
}

export { data, execute };
