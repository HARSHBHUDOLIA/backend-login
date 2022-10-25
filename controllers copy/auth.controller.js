const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const result = await AuthServiceInstance.signup(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await AuthServiceInstance.login(username, password);
    if (result.isLoggedIn) {
     
      res.status(200).json(result);
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  postSignup,
  postLogin,
};
