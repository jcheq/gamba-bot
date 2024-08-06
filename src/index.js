require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const connectDB = require('./config/db');
const eventHandler = require('./handlers/eventHandler');

const User = require("./schemas/UserSchema");
const Inventory = require("./schemas/InventorySchema");
const Guild = require("./schemas/GuildSchema");
const Cards = require("./schemas/CardCollectionSchema");

const PREFIX = '.'; // Command prefix

const rarityChances = {
  Common: 65,
  Rare: 20,
  Epic: 11.25,
  Legendary: 3,
  Mythic: 0.5,
  Weapon: 0.25,
  Unique: 0.01
};

const rarityOrder = ["Common", "Rare", "Epic", "Legendary", "Mythic", "Weapon", "Unique"];

const characters = {
  Common: [
    "Character A", "Character B", "Character C", "Character D", "Character E",
    "Character F", "Character G", "Character H", "Character I", "Character J"
  ],
  Rare: ["Character K", "Character L", "Character M", "Character N", "Character O"],
  Epic: ["Character P", "Character Q", "Character R", "Character S", "Character T"],
  Legendary: ["Character U", "Character V", "Character W"],
  Mythic: ["Character X", "Character Y"],
  Weapon: ["Weapon A", "Weapon B"],
  Unique: ["Character Z"]
};

eventHandler(client);




function weightedRandomSelect(obj) {
    const totalChance = Object.values(obj).reduce((acc, chance) => acc + chance, 0);
    let randomChance = Math.random() * totalChance;
    for (const [key, value] of Object.entries(obj)) {
      if (randomChance < value) {
        return key;
      }
      randomChance -= value;
    }
  }
  
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    
    if (command === 'draw') {
      
      const numPulls = parseInt(args[0], 10) || 1;
      if (numPulls < 0 || numPulls > 100) {
        return message.channel.send(`Please use a number between 0-100`);
      }
      

      const pulls = [];
  
      for (let i = 0; i < numPulls; i++) {
        const selectedRarity = weightedRandomSelect(rarityChances);
        const rarityCharacters = characters[selectedRarity];
        const pulledCharacter = rarityCharacters[Math.floor(Math.random() * rarityCharacters.length)];
        pulls.push({ name: pulledCharacter, rarity: selectedRarity });
      }
  
      const significantPulls = pulls.filter(pull => {
        return rarityOrder.indexOf(pull.rarity) >= rarityOrder.indexOf("Legendary");
        
      });
      console.log(significantPulls);
      if (significantPulls.length > 0) {
        const pullMessages = significantPulls.map(pull => `${pull.name} (${pull.rarity})`);
        message.channel.send(`You pulled: ${pullMessages.join(', ')}`);
      } else {
        message.channel.send("You didn't pull any Legendary or higher rarity items.");
        
      }
    }
});


client.login(process.env.BOT_TOKEN);
connectDB();