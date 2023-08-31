const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});


// 3) ROUTES
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    const err = new AppError(
        `Can't find ${req.originalUrl} on this server.`,
        404
    );

    next(err);
});

app.use(globalErrorHandler);

module.exports = app;