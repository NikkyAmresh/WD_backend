const users = require("../controllers/user.controller");
const lists = require("../controllers/list.controller");
const card = require("../controllers/card.controller");
const Token = require("../middleware/auth");
module.exports = (app) => {
  const token = new Token();
  app.use(token.verify);
  app.get("/", users.isLoggedIn);
  app.get("/AllData", lists.getAll);
  app.post("/lists",lists.create)
  app.put("/lists/:id",lists.update)
  app.delete("/lists/:id", lists.delete);
  app.post("/cards",card.create)
  app.put("/cards/:id",card.update)
  app.delete("/cards/:id",card.delete);
};
