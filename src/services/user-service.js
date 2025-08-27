const { UserRepository } = require("../repositories/index");
const { JWT_SECRET_KEY } = require("../config/server-config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    comparePassword = (userInputplainTextPassword, encryptedPassword) => {
        try {
            const response = bcrypt.compareSync(userInputplainTextPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("something went wrong while comparing password");
            throw { error };
        }
    }


}

module.exports = UserService;