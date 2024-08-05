const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
    },

    balance: {
        type: String,
    },

    guildName: {
        type: String,
    }
    
  });
  
  module.exports = mongoose.model('User', UserSchema);