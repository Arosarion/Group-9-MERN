const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("../models/Quiz");

dotenv.config();

const questions = [
  {
    topicSlug: "heart",
    question: "How many chambers does the human heart have?",
    choices: ["2", "3", "4", "5"],
    correctAnswer: "4",
    explanation: "The heart has four chambers: two atria and two ventricles."
  },
  {
    topicSlug: "heart",
    question: "Which chamber pumps oxygen-rich blood to the body?",
    choices: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    correctAnswer: "Left ventricle",
    explanation: "The left ventricle pumps oxygenated blood through the aorta to the body."
  },
  {
    topicSlug: "heart",
    question: "What blood vessel carries oxygen-rich blood away from the heart?",
    choices: ["Aorta", "Vena cava", "Pulmonary artery", "Pulmonary vein"],
    correctAnswer: "Aorta",
    explanation: "The aorta is the main artery that carries oxygen-rich blood to the body."
  },

  {
    topicSlug: "lungs",
    question: "What is the main job of the lungs?",
    choices: ["Pump blood", "Exchange oxygen and carbon dioxide", "Digest food", "Control movement"],
    correctAnswer: "Exchange oxygen and carbon dioxide",
    explanation: "The lungs bring oxygen into the body and remove carbon dioxide."
  },
  {
    topicSlug: "lungs",
    question: "What tiny air sacs in the lungs help with gas exchange?",
    choices: ["Alveoli", "Neurons", "Tendons", "Cartilage"],
    correctAnswer: "Alveoli",
    explanation: "Alveoli are tiny air sacs where oxygen and carbon dioxide are exchanged."
  },
  {
    topicSlug: "lungs",
    question: "Which muscle helps the lungs expand during breathing?",
    choices: ["Bicep", "Diaphragm", "Hamstring", "Triceps"],
    correctAnswer: "Diaphragm",
    explanation: "The diaphragm contracts and moves downward to help the lungs fill with air."
  },

  {
    topicSlug: "brain",
    question: "Which part of the brain controls balance and coordination?",
    choices: ["Cerebellum", "Heart", "Spinal cord", "Liver"],
    correctAnswer: "Cerebellum",
    explanation: "The cerebellum helps control balance, coordination, and smooth movement."
  },
  {
    topicSlug: "brain",
    question: "Which part of the brain is responsible for thinking and memory?",
    choices: ["Cerebrum", "Stomach", "Femur", "Lungs"],
    correctAnswer: "Cerebrum",
    explanation: "The cerebrum handles thinking, memory, learning, and voluntary movement."
  },
  {
    topicSlug: "brain",
    question: "What connects the brain to the rest of the body?",
    choices: ["Spinal cord", "Rib cage", "Esophagus", "Tendon"],
    correctAnswer: "Spinal cord",
    explanation: "The spinal cord carries signals between the brain and the body."
  },

  {
    topicSlug: "skeletal-system",
    question: "What is the main purpose of the skeletal system?",
    choices: ["Support and protect the body", "Pump blood", "Break down food", "Produce thoughts"],
    correctAnswer: "Support and protect the body",
    explanation: "The skeleton supports the body, protects organs, and helps movement."
  },
  {
    topicSlug: "skeletal-system",
    question: "What bone protects the brain?",
    choices: ["Skull", "Femur", "Rib", "Tibia"],
    correctAnswer: "Skull",
    explanation: "The skull protects the brain from injury."
  },
  {
    topicSlug: "skeletal-system",
    question: "What is the largest bone in the human body?",
    choices: ["Femur", "Humerus", "Radius", "Clavicle"],
    correctAnswer: "Femur",
    explanation: "The femur, located in the thigh, is the largest bone in the body."
  },

  {
    topicSlug: "muscular-system",
    question: "What is the main job of muscles?",
    choices: ["Help the body move", "Store memories", "Filter blood", "Create oxygen"],
    correctAnswer: "Help the body move",
    explanation: "Muscles contract and relax to help the body move."
  },
  {
    topicSlug: "muscular-system",
    question: "What muscle is found in the upper arm?",
    choices: ["Bicep", "Femur", "Skull", "Lung"],
    correctAnswer: "Bicep",
    explanation: "The bicep is a muscle in the upper arm that helps bend the elbow."
  },
  {
    topicSlug: "muscular-system",
    question: "Which type of muscle is found in the heart?",
    choices: ["Cardiac muscle", "Skeletal muscle", "Smooth muscle", "Bone muscle"],
    correctAnswer: "Cardiac muscle",
    explanation: "Cardiac muscle is the special muscle tissue that makes up the heart."
  },

  {
    topicSlug: "digestive-system",
    question: "What is the main job of the digestive system?",
    choices: ["Break down food", "Pump blood", "Control balance", "Move oxygen"],
    correctAnswer: "Break down food",
    explanation: "The digestive system breaks food into nutrients the body can use."
  },
  {
    topicSlug: "digestive-system",
    question: "Where does digestion begin?",
    choices: ["Mouth", "Small intestine", "Stomach", "Liver"],
    correctAnswer: "Mouth",
    explanation: "Digestion begins in the mouth when food is chewed and mixed with saliva."
  },
  {
    topicSlug: "digestive-system",
    question: "Which organ absorbs most nutrients from food?",
    choices: ["Small intestine", "Heart", "Lungs", "Brain"],
    correctAnswer: "Small intestine",
    explanation: "The small intestine absorbs most nutrients into the bloodstream."
  },

  {
    topicSlug: "cpr",
    question: "What does CPR help do?",
    choices: ["Keep blood and oxygen moving", "Heal broken bones", "Stop digestion", "Improve eyesight"],
    correctAnswer: "Keep blood and oxygen moving",
    explanation: "CPR helps circulate blood and oxygen when the heart is not pumping properly."
  },
  {
    topicSlug: "cpr",
    question: "Where should chest compressions be performed?",
    choices: ["Center of the chest", "Left shoulder", "Stomach", "Neck"],
    correctAnswer: "Center of the chest",
    explanation: "Chest compressions are performed in the center of the chest."
  },
  {
    topicSlug: "cpr",
    question: "What should you do first if someone is unresponsive and not breathing normally?",
    choices: ["Call emergency services", "Give them food", "Wait quietly", "Move them far away"],
    correctAnswer: "Call emergency services",
    explanation: "Emergency services should be called right away before or while starting CPR."
  },

  {
    topicSlug: "choking",
    question: "What is a common sign that someone is choking?",
    choices: ["Unable to speak or breathe", "Sneezing", "Feeling tired", "Itchy eyes"],
    correctAnswer: "Unable to speak or breathe",
    explanation: "A choking person may not be able to speak, cough, or breathe."
  },
  {
    topicSlug: "choking",
    question: "What should you encourage if a choking person can still cough strongly?",
    choices: ["Keep coughing", "Drink soda", "Lie down", "Hold their breath"],
    correctAnswer: "Keep coughing",
    explanation: "Strong coughing can help clear the airway."
  },
  {
    topicSlug: "choking",
    question: "What is the airway?",
    choices: ["The path air uses to enter the lungs", "A bone in the leg", "A heart valve", "A stomach muscle"],
    correctAnswer: "The path air uses to enter the lungs",
    explanation: "The airway is the passage that allows air to move into the lungs."
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Quiz.deleteMany({});
    await Quiz.insertMany(questions);

    console.log("Questions seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  }
};

seedQuestions();
