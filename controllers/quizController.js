const Quiz = require('../models/quizModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllQuizzes = catchAsync(async (req, res) => {
    const quizzes = await Quiz.find();

    res.status(200).json({
        status: 'success',
        results: quizzes.length,
        data: quizzes,
    });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
        return next(new AppError('No quiz found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            quiz,
        },
    });
});

exports.createQuiz = catchAsync(async (req, res) => {
    const newQuiz = await Quiz.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            quiz: newQuiz,
        },
    });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Orjinali yerine güncellenmiş halini geri döndürür.
        runValidators: true,
    });

    if (!quiz) {
        return next(new AppError('No quiz found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            quiz,
        },
    });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
        return next(new AppError('No quiz found with that ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null,
    });
});