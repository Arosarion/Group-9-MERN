const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Topic = require("../models/LearnTopic");

dotenv.config();

const topics = [
  {
    title: "Heart",
    slug: "heart",
    summary: "Learn the main parts of the heart and how blood flows through it."
  },
  {
    title: "Lungs",
    slug: "lungs",
    summary: "Learn how the lungs help the body breathe and exchange oxygen."
  },
  {
    title: "Brain",
    slug: "brain",
    summary: "Learn the basic parts of the brain and what they control."
  },
  {
    title: "Skeletal System",
    slug: "skeletal-system",
    summary: "Learn about bones, joints, and the structure of the body."
  },
  {
    title: "Muscular System",
    slug: "muscular-system",
    summary: "Learn how muscles help the body move."
  },
  {
    title: "Digestive System",
    slug: "digestive-system",
    summary: "Learn how the body breaks down food and absorbs nutrients."
  },
  {
    title: "CPR",
    slug: "cpr",
    summary: "Learn the basic purpose and steps of CPR."
  },
  {
    title: "Choking",
    slug: "choking",
    summary: "Learn how to recognize and respond to choking."
  }
];

const seedTopics = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Topic.deleteMany({});
    await Topic.insertMany(topics);

    console.log("Topics seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding topics:", error);
    process.exit(1);
  }
};

seedTopics();
