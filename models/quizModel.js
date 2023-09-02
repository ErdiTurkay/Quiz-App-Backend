const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    questionCount: {
        type: Number,
        default: 0
    }
});

quizSchema.methods.incQuestionCount = async function () {
    this.questionCount += 1;
    await this.save();
};

quizSchema.methods.decQuestionCount = async function () {
    this.questionCount -= 1;
    await this.save();
};

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;