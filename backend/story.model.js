const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Story = new Schema({
    story_title: {
        type: String
    },
    story_content: {
        type: String
    }
});
module.exports = mongoose.model('Story', Story);