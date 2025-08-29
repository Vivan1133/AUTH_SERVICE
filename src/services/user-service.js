const { UserRepository } = require("../repositories/index");
const { 
    JWT_SECRET_KEY,
    VERIFY_SEND_EMAIL_FROM_PASS,
    VERIFY_SEND_EMAIL_FROM
} = require("../config/server-config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw { error };
        }
    }

    async destroy(userId) {
        try {
            const user = await this.userRepository.destroy(userId);
            return user;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw { error };
        }
    }

    createToken = (user) => {
        try {
            const token = jwt.sign(user, JWT_SECRET_KEY, {
                expiresIn: "1h"
            })
            return token;
        } catch (error) {
            console.log("something went wrong in the token creation");
            throw { error };
        }
    }

    validateToken = (token) => {
        try {
            const response = jwt.verify(token, JWT_SECRET_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in the token validation");
            throw { error };
        }
    }

    isAuthenticated = async (token) => {
        try {
            const response = this.validateToken(token);
            if(!response) {
                throw { error: "token validation failed" };
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw { error: "no such user exists anymore "};
            }
            return user.id;

        } catch (error) {
            console.log("something went wrong in the token validation");
            throw { error };
        }
    }

    comparePassword = (userInputplainTextPassword, encryptedPassword) => {
        try {
            const response = bcrypt.compareSync(userInputplainTextPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("something went wrong while comparing password");
            throw { error };
        }
    }

    signIn = async (email, plainTextPassword) => {
        try {
            const user = await this.userRepository.getByEmail(email);
            // if(!user.isVerified) {
            //     await this.sendVerificationEmail(user);
            //     console.log("verification link sent to email");
            //     throw { error: "looks like your email is not verified, please verify your email and then try again" }
            // }

            const passwordMatch = this.comparePassword(plainTextPassword, user.password);
            if(!passwordMatch) {
                console.log("password matching failed");
                throw { error: "incorrect password entered"};
            }

            const JWT_TOKEN = this.createToken({email: user.email, id: user.id});
            return JWT_TOKEN;

        } catch (error) {
            console.log("something went wrong while signing in");
            throw { error };
        }
    }

    // sendVerificationEmail = async (user) => {
    //     try {
    //         const transporter = nodemailer.createTransport({
    //             service: 'Gmail',
    //             auth: {
    //                 user: VERIFY_SEND_EMAIL_FROM,
    //                 pass: VERIFY_SEND_EMAIL_FROM_PASS
    //             }
    //         });

    //         const token = this.createToken(user);
    //         const url = `http://localhost:3001/api/v1/verify?token=${token}`

    //         const mailOptions = {
    //             from: VERIFY_SEND_EMAIL_FROM,
    //             to: user.email,
    //             subject: 'email verification',
    //             html: `<p>Click the link below to verify your email:</p>
    //             <a href="${url}">${url}</a>`
    //         };
    //         await transporter.sendMail(mailOptions);
    //         return true;
    //     } catch (error) {
    //         console.log("can not verify email");
    //         throw { error };
    //     }
    // }
}

module.exports = UserService;