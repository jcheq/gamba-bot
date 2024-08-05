const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    guildName: {
        type: String,
    },

    guildCoins: {
        type: String,
    },

    creatorID: {
        type: String,
    }
    
  });
  
  module.exports = mongoose.model('Guild', GuildSchema);