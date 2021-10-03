const jwt = require("jsonwebtoken");
const fs = require("fs");
const { JWT_CONFIG } = require("../constants");
var privateKEY = fs.readFileSync(__dirname + "/../AuthKeys/key", "utf8");
var publicKEY = fs.readFileSync(__dirname + "/../AuthKeys/key.pub", "utf8");

const signOptions = {
  issuer: JWT_CONFIG.ISSUER,
  subject: JWT_CONFIG.SUBJECT,
  audience: JWT_CONFIG.AUDIENCE,
  expiresIn: JWT_CONFIG.TOKEN.VALIDITY,
  /** @type {any} */ algorithm: JWT_CONFIG.ALOGO,
};
const helper = {
  sign: (
    /** @type {{ id: any; email: any }} */ user
  ) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      privateKEY,
      signOptions
    );
  },
  /**
   *
   * @param {*} token
   * @returns {Object} result
   */
  verify: (/** @type {string} */ token) => {
    return jwt.verify(token, publicKEY, signOptions);
  },
};
module.exports = helper;
