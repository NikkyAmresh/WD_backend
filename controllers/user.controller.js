const { Messages } = require("../constants");
const User = require("./../models/users.model");

const authControllers = {
  profile: (
    /** @type {{ user: { id: any; }; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: any; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res
  ) => {
    User.getById(
      req.user.id,
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: err.message || Messages.USER.PROFILE.GET_ERROR,
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  isLoggedIn: (
    /** @type {{ user: { id: any; }; }} */ req,
    /** @type {{ sendStatus: (arg0: number) => void; }} */ res
  ) => {
    if (req.user.id) res.sendStatus(202);
    else res.sendStatus(401);
  },
};
module.exports = authControllers;
