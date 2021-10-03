const User = require("../models/users.model");
const Auth = require("../models/auth.model");
const { Messages } = require("../constants");
const authControllers = {
  create: (
    /** @type {{ body: { firstname: any; lastname: any; email: any; password: any; mobile: any; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: any; }): void; new (): any; }; }; send: (arg0: any) => void; }} */ res
  ) => {
    const { firstname, lastname, email, password, mobile } = req.body;
    if (!(email && password && firstname && lastname && mobile)) {
      return res.status(400).send({
        message: Messages.USER_INPUT_ERROR.NOT_ALL_FIELDS_AVAILABLE,
      });
    }

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      mobile: mobile,
    });

    User.getByEmail(
      email,
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          return res.status(500).send({
            message: err.message || Messages.USER.CREATION_ERROR,
          });
        else if (data)
          res.status(400).send({
            message: Messages.USER.EMAIL_ALREADY_EXISTS,
          });
        else
          User.getByMobile(
            mobile,
            (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
              if (err)
                res.status(500).send({
                  message: err.message || Messages.USER.CREATION_ERROR,
                });
              if (data)
                res.status(400).send({
                  message: Messages.USER.MOBILE_ALREADY_EXISTS,
                });
              else
                user.create(
                  (
                    /** @type {{ message: any; }} */ err,
                    /** @type {any} */ data
                  ) => {
                    if (err)
                      res.status(500).send({
                        message: err.message || Messages.USER.CREATION_ERROR,
                      });
                    else res.status(201).send(data);
                  }
                );
            }
          );
      }
    );
  },
  login: (
    /** @type {{ body: { email: any; password: any; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; }} */ res
  ) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }
    const authentication = new Auth({ email, password });
    authentication.login((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Invalid credentials!",
        });
      else if (data) res.status(200).send(data);
      else
        res.status(403).send({
          message: "Invalid credentials!",
        });
    });
  },
};
module.exports = authControllers;
