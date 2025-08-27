const { UserService } = require("../services/index");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            message: "successfully created new user",
            error: {},
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong",
            error: error,
            data: {},
            success: false
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(201).json({
            success: true,
            message: "successfully signed in",
            error: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong",
            error: error,
            data: {},
            success: false
        })
    }
}

module.exports = {
    create,
    signIn
}