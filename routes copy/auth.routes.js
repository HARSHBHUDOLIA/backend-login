const router = require("express").Router();
const { postSignup, postLogin } = require("../controllers/auth.controller");

const { validateSchema } = require("../middlewares/validate.middleware");
const { userValidationSchema } = require("../validations/user.validator");

const { loginBodyValidationSchema } = require("../validations/auth.validator");

const validateUserRequestMiddleware = validateSchema(userValidationSchema);
const loginBodyValidatorMiddleware = validateSchema(loginBodyValidationSchema);

router.post("/signup", validateUserRequestMiddleware, postSignup);
router.post("/login", loginBodyValidatorMiddleware, postLogin);

module.exports = router;