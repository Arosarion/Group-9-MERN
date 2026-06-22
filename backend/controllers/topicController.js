//topicController

const LearnTopic = require('../models/LearnTopic');

const getTopics = async (req, res) => {
    try {
        const topics = await LearnTopic.find().select('title slug category summary');
        res.json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopicBySlug = async (req, res) => {
    try {
        const topic = await LearnTopic.findOne({ slug: req.params.slug});

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json(topic);
    } catch (error) {
        res.status(500).json({ message: "Error fetching topic" });
    }
};

const createTopic = async (req, res) => {
    try {
        const topic = await LearnTopic.create(req.body);
        res.status(201).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Error creating topic" });
    }
};

module.exports = {
    getTopics,
    getTopicBySlug,
    createTopic
};
