const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    quizId: {
        type: Object,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    optionA: {
        type: String,
        required: true,
    }, // Doğru cevap A şıkkı olmalıdır.
    optionB: {
        type: String,
        required: true,
    },
    optionC: {
        type: String,
    },
    optionD: {
        type: String,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;