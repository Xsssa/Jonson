const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Cek latency bot'),

  async execute(interaction) {
    // Menghitung latency bot
    const ping = Math.round(interaction.client.ws.ping);

    // Membuat options untuk pesan embed
    const embed = {
      color: 0x0099FF,
      title: 'Latency Bot',
      description: `Latency Bot: ${ping} ms`,
      timestamp: new Date(),
    };

    // Mengirim embed sebagai respons
    await interaction.reply({ embeds: [embed] });
  },
};

