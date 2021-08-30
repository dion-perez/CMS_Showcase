module.exports = {
    mongoDbUrl: 'mongodb+srv://Dion:uyvcRuZPiEpjmNpe@cluster0.bc7xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    PORT: process.env.PORT || 3000,
    // Middleware variables available throughout project
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');

        next();
    }
};