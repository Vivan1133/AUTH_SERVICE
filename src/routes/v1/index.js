const express = require("express");
const { UserController } = require("../../controllers/index");
const { AuthRequestValidatorMiddleWare } = require("../../middlewares/index");
const router = express.Router();

router.post(
    "/signup",
    AuthRequestValidatorMiddleWare.authRequestValidator,
    UserController.create
);

router.post(
    "/signin",
    AuthRequestValidatorMiddleWare.authRequestValidator,
    UserController.signIn
);

module.exports = router;