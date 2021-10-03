const auth = require("../controllers/auth.controller");
module.exports = (app) => {
  app.post("/users", auth.create);
  app.post("/login", auth.login);
};
