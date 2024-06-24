import {
  ActionRowBuilder,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
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
  await setupSelectMenu(openChannel);

  await interaction.reply({
    content: 'Tickets configurados com sucesso!',
    ephemeral: true,
  });
}

async function setupSelectMenu(openChannel) {
  const options = [
    new StringSelectMenuOptionBuilder()
      .setLabel('Dúvidas')
      .setDescription('Caso tenha alguma dúvida ou problema.')
      .setEmoji('💬')
      .setValue('question'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Denúncias')
      .setDescription('Caso queira denunciar um membro.')
      .setEmoji('⛔')
      .setValue('report'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Sugestões')
      .setDescription('Caso tenha alguma sugestão para o servidor.')
      .setEmoji('💡')
      .setValue('suggestion'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Financeiro.')
      .setDescription('Caso queira falar sobre financeiro.')
      .setEmoji('💵')
      .setValue('finance'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Bug')
      .setDescription('Caso queira reportar um bug.')
      .setEmoji('🚧')
      .setValue('bug'),
    new StringSelectMenuOptionBuilder()
      .setLabel('Outro')
      .setDescription('Caso não se encaixe em nenhuma das opções acima.')
      .setEmoji('🔄')
      .setValue('other'),
  ];

  const select = new StringSelectMenuBuilder()
    .setCustomId('ticket-select-menu')
    .setPlaceholder('Clique para selecionar uma opção')
    .addOptions(...options);

  const button = new ActionRowBuilder().addComponents(select);

  await openChannel.send({ components: [button] }).catch(console.error);
}

async function setupWebhook(openChannel) {
  const webhooks = await openChannel.fetchWebhooks();
  if (webhooks.size > 0) return;

  const embed = new EmbedBuilder()
    .setTitle('Atendimento')
    .setDescription(
      'Para iniciarmos seu atendimento clique no botão abaixo. Para agilizar os procedimentos nos envie seu problema e anexe as imagens se necessário!'
    )
    .setImage(
      'https://images-ext-1.discordapp.net/external/gUStikhK_APpsCcuwL-wB4nat9AJ0JHP6Foi1i0atcQ/https/i.imgur.com/9A7ias9.png?format=webp&quality=lossless'
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
      });
    })
    .catch(console.error);
}

export { data, execute };
