const mongoose = require('mongoose');
const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },  
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d' 
    }
});
const Blacklist = mongoose.model('Blacklist', blacklistSchema);
module.exports = Blacklist;