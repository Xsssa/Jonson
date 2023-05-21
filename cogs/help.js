const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Menampilkan daftar perintah yang tersedia'),
  
    async execute(interaction) {
      // Membuat pesan embed
      const embed = {
        color: 0x0099FF,
        title: 'Daftar Perintah',
        description: 'Berikut adalah daftar perintah yang tersedia:',
        timestamp: new Date(),
        fields: []
      };
  
      // Menambahkan field untuk setiap perintah dalam koleksi commands
      interaction.client.commands.forEach(command => {
        embed.fields.push({
          name: `/${command.data.name}`,
          value: command.data.description,
        });
      });
  
      // Mengirim embed sebagai respons
      await interaction.reply({ embeds: [embed] });
    },
  };
  
