const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllQuestions = catchAsync(async (req, res, next) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        return next(new AppError('No quiz found with that ID!', 404));
    }

    const questions = await Question.find({ quizId });

    res.status(200).json({
        status: 'success',
        results: questions.length,
        data: questions,
    });
});

exports.getQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        return next(new AppError('No question found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            question,
        },
    });
});

exports.createQuestion = catchAsync(async (req, res, next) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId)

    if (!quiz) {
        return next(new AppError('No quiz found with that ID!', 404));
    }

    const newQuestion = await Question.create({
        ...req.body,
        quizId,
    });

    quiz.incQuestionCount();

    res.status(201).json({
        status: 'success',
        data: {
            question: newQuestion,
        },
    });
});

exports.updateQuestion = catchAsync(async (req, res, next) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Orjinali yerine güncellenmiş halini geri döndürür.
        runValidators: true,
    });

    if (!question) {
        return next(new AppError('No question found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            question,
        },
    });
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
        return next(new AppError('No question found with that ID!', 404));
    }

    const quizId = question.quizId;

    await Question.findByIdAndDelete(questionId);

    const quiz = await Quiz.findById(quizId);
    quiz.decQuestionCount();

    res.status(200).json({
        status: 'success',
        data: null,
    });
});