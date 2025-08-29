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

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            error: "user id not given",
            message: "something went wrong"
        })
    }
    next();
}

module.exports = {
    authRequestValidator,
    validateIsAdminRequest
}