const sql = require("./db.js");
const { sign } = require("../helper/jwt.js");
class Auth {
  /**
   * @param {{ email: any; password: any; }} Auth
   */
  constructor(Auth) {
    this.email = Auth.email;
    this.password = Auth.password;
  }
  /**
   * @param {(arg0: import("mysql").MysqlError, arg1: any) => void} result
   */
  login(result) {
    const sqlQuery = `SELECT * from users where email=${sql.escape(
      this.email
    )} and password=md5('${this.password}')`;
    sql.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        let user = res[0];
        delete user.password;
        const token = sign({
          id: user.id,
          email: user.email,
        });
        user.token = token;
        result(null, user);
      } else {
        result(null, null);
      }
    });
  }
}

module.exports = Auth;
