const authRequestValidator = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "something went wrong",
            error: "email or password missing",
            data: {},
            success: false
        })
    }
    next();
}

module.exports = {
    authRequestValidator
}