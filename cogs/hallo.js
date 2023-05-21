const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hallo')
    .setDescription('Menyapa pengguna'),

  async execute(interaction) {
    // Mengambil username pengguna
    const username = interaction.user.username;

    // Membuat pesan embed
    const embed = {
      color: 0x0099FF,
      title: 'Hai!',
      description: `Halo, ${username}!Sayang!`,
      timestamp: new Date(),
    };

    // Mengirim embed sebagai respons
    await interaction.reply({ embeds: [embed] });
  },
};
