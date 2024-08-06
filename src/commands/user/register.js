const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require('discord.js');


  module.exports = {
    data: new SlashCommandBuilder()
      .setName('register')
      .setDescription('Use item from inventory'),
    async execute(interaction) {
        console.log("Register");
      
    
    },
    
  };