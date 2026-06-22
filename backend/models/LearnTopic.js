const mongoose = require('mongoose');
const learnTopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: "First Aid"
    },
    summary: {
        type: String,
        required: true
    },
    sections: [{
        heading: String,
        body: String
    }]
},
    { timestamps: true });

module.exports = mongoose.model('LearnTopic', learnTopicSchema);
