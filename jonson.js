// Import module Discord.js v14
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

// Membuat instance client Discord
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    // Tambahkan intent-intent lain yang diperlukan sesuai kebutuhan
  ],
});

// Membuat koleksi untuk menyimpan command
client.commands = new Collection();

// Mendapatkan token bot Anda dari environment variable atau file konfigurasi
const BOT_TOKEN = process.env.BOT_TOKEN || require('./config.json').botToken;

// Mendapatkan prefix bot Anda dari environment variable atau file konfigurasi
const PREFIX = process.env.PREFIX || require('./config.json').prefix;

// Mendapatkan direktori cogs
const COGS_DIR = './cogs/';

// Membaca file cogs dan menginisialisasi setiap cog
fs.readdirSync(COGS_DIR).forEach((file) => {
  if (file.endsWith('.js')) {
    const cog = require(`${COGS_DIR}/${file}`);
    client.commands.set(cog.data.name, cog);
  }
});

// Event handler untuk event ready
client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Menyinkronkan slash command secara global
  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: client.commands.map(command => command.data.toJSON()) }
    );
    console.log('Slash command berhasil disinkronkan secara global!');
  } catch (error) {
    console.error(`Gagal menyinkronkan slash command secara global: ${error}`);
  }
});

// Event handler untuk event interactionCreate
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton() && !interaction.isCommand()) return; // Memeriksa apakah interaksi merupakan slash command atau button interaction

  if (interaction.isButton()) {
    // Meng-handle button interaction (jika ada)
    // implementasi button interaction Anda
  }

  if (interaction.isCommand()) {
    // Meng-handle slash command
    const command = client.commands.get(interaction.commandName); // Mendapatkan command berdasarkan nama
    if (!command) return; // Jika command tidak ditemukan, keluar

    try {
      await command.execute(interaction); // Menjalankan fungsi execute dari command
    } catch (error) {
      console.error(`Gagal menjalankan perintah "${interaction.commandName}": ${error}`);
    }
  }
});


// Mengganti TOKEN_BOT_ANDA dengan token bot yang Anda dapatkan dari Discord Developer Portal
client.login(BOT_TOKEN);
