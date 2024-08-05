require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
const mongoose = require("mongoose");
const User = require("./schemas/UserSchema");
const Inventory = require("./schemas/InventorySchema");
const Guild = require("./schemas/GuildSchema");





client.on("ready", () => {
    console.log("yolo");
    client.user.setActivity('with boba')
    

});


client.login(process.env.BOT_TOKEN);