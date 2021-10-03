const users = require("../controllers/user.controller");
const Token = require("../middleware/auth");
module.exports = (app) => {
  const token = new Token();
  app.use(token.verify);
  app.get("/", users.isLoggedIn);
  app.get("/me", users.profile);
};
