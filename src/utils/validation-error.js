const AppErrors = require("./error-handlers");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppErrors {
    constructor(error) {

        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })

        super(
            errorName,
            "not able to validate the data sent in a request",
            explanation,
            StatusCodes.BAD_REQUEST
        )
    } 
}

module.exports = ValidationError;