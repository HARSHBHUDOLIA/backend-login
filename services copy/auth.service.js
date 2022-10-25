const bcrypt = require("bcrypt");
const UserService = require("./user.service");
const UserServiceInstance = new UserService();
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
class AuthService {
  signup = async (data) => {
    const hashedPassword = await this.hashPassword(data.password);
    const user = await UserServiceInstance.register({
      ...data,
      password: hashedPassword,
    });
    return user;
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  login = async (username, password) => {
    const user = await UserServiceInstance.findByUsername(username);
    if (!user) return { isLoggedIn: false };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return { isLoggedIn: true, user, jwt: this.generateToken(user._id) };
    } else {
      return { isLoggedIn: false };
    }
  };

  generateToken = (userId) => {
    const payload = { userId };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, secret, options);
    return token;
  };
}

module.exports = AuthService;
