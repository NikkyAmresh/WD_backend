const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const authRouter = express.Router();
const secureRouter = express.Router();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const PORT = process.env.PORT || 3002;
app.use(bodyParser.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/secure/", secureRouter);

authRoutes(authRouter);
userRoutes(secureRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server is busy");
    console.log("Error :" + err);
  } else {
    console.log("Server running at PORT : " + PORT);
  }
});
