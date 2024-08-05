require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const connectDB = require('./config/db');

const User = require("./schemas/UserSchema");
const Inventory = require("./schemas/InventorySchema");
const Guild = require("./schemas/GuildSchema");


client.on("ready", () => {
    client.user.setActivity('with boba')
});

client.login(process.env.BOT_TOKEN);
connectDB();