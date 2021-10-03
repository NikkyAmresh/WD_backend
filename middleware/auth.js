const { Messages } = require("../constants");
const { verify } = require("../helper/jwt");
class Token {
  verify = (
    /** @type {{ headers: { [x: string]: any; }; user: any; admin: any; }} */ req,
    /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): any; new (): any; }; }; }} */ res,
    /** @type {() => any} */ next
  ) => {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send({
        message: Messages.AUTH.TOKEN_UNAVAILABLE,
      });
    }
    token = token.split(" ")[1];
    try {
      const decoded = verify(token);
      req.user = decoded;
    } catch (err) {
      console.log(err)
      return res.status(401).send({
        message: Messages.AUTH.INVALID_TOKEN,
      });
    }
    return next();
  };
}

module.exports = Token;
