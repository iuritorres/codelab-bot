import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('setuptickets')
  .setDescription('Cria o ambiente necessário para criação de tickets.')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addChannelOption((option) =>
    option
      .setName('canal_de_abertura')
      .setDescription('Canal onde os tickets serão abertos.')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .addChannelOption((option) =>
    option
      .setName('categoria_de_tickets')
      .setDescription('Canal onde ficarão os tickets.')
      .addChannelTypes(ChannelType.GuildCategory)
      .setRequired(true)
  )
  .addRoleOption((option) =>
    option
      .setName('cargo_de_suporte')
      .setDescription('Cargo que terá acesso aos tickets.')
  );

async function execute(interaction) {
  const openChannel = interaction.options.getChannel('canal_de_abertura');
  const ticketsCategory = interaction.options.getChannel(
    'categoria_de_tickets'
  );
  const supportRole = interaction.options.getRole('cargo_de_suporte');

  await setupWebhook(openChannel);

  await interaction.reply({
    content: 'Tickets configurados com sucesso!',
    ephemeral: true,
  });
}

async function setupWebhook(openChannel) {
  // const webhooks = await openChannel.fetchWebhooks();
  // if (webhooks.size > 0) return;

  const embed = new EmbedBuilder()
    .setTitle('Atendimento')
    .setDescription(
      'Para iniciarmos seu atendimento clique no botão abaixo. Para agilizar os procedimentos nos envie seu problema e anexe as imagens se necessário!'
    )
    .setImage(
      'https://images-ext-1.discordapp.net/external/gUStikhK_APpsCcuwL-wB4nat9AJ0JHP6Foi1i0atcQ/https/i.imgur.com/9A7ias9.png?format=webp&quality=lossless'
    );

  const button = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('openTicket')
      .setLabel('Abrir Ticket')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🎟')
  );

  await openChannel
    .createWebhook({
      name: 'Code Lab',
      avatar:
        'https://cdn.discordapp.com/icons/1088141850629636177/16931934f1bf2a261b58484a7ce4eccb.webp?size=96',
    })
    .then(async (webhook) => {
      await webhook.send({
        embeds: [embed],
        components: [button],
      });
    })
    .catch(console.error);
}

export { data, execute };
