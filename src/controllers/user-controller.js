const { UserService } = require("../services/index");

const userService = new UserService();
const jwt = require("jsonwebtoken");

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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: "user is authenticated"
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

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "successfully fetched whether user is admin or not",
            error: {}
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

// const verify = (req, res) => {
//     try {
//         const { token } = req.query;
//         const response = userService.validateToken(token);
//         return res.status(200).json({
//             success: true,
//             error: {},
//             data: response,
//             message: "email verified"
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "something went wrong",
//             error: error,
//             data: {},
//             success: false
//         })
//     }
// }

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
    // verify
}