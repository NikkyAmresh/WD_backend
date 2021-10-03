"use strict";
const db = require("./db.js");
const { sign } = require("../helper/jwt.js");
const { NUMBER_PER_PAGE } = require("../constants.js");
class User {
  /**
   * @param {{
   * firstname?: String;
   * lastname?: String;
   * email?: String;
   * password?: String;
   * mobile?: Number;
   * id?: Number;
   * }} User
   */
  constructor(User) {
    this.firstname = User.firstname;
    this.lastname = User.lastname;
    this.email = User.email;
    this.mobile = User.mobile;
    this.password = User.password;
    this.id = User.id || undefined;
    this.token = undefined;
    this.adminPrivilages = false;
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  create(result) {
    const sqlQuery = `INSERT INTO users (id, firstname, lastname, email, password, mobile, doj) VALUES (NULL, ${db.escape(
      this.firstname
    )}, ${db.escape(this.lastname)}, ${db.escape(this.email)}, md5(${db.escape(
      this.password
    )}), ${db.escape(this.mobile)}, CURRENT_TIMESTAMP)`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      this.id = res.insertId;
      delete this.password;
      const token = sign({
        id: this.id,
        email: this.email,
      });
      this.token = token;
      result(null, this);
    });
  }

  /**
   * @param {(arg0: any, arg1: any) => void} result
   */
  getByMobileOrEmail(result) {
    if (this.mobile) {
      User.getByMobile(
        this.mobile,
        (/** @type {any} */ err, /** @type {any} */ user) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          result(null, user);
          return;
        }
      );
    }
    if (this.email) {
      User.getByEmail(
        this.email,
        (/** @type {any} */ err, /** @type {any} */ user) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          result(null, user);
          return;
        }
      );
    }
  }

  /**
   * @param {any} userId
   * @param {{ (err: any, data: any): void; (arg0: import("mysql").MysqlError, arg1: import("./users.model.js")): void; }} result
   */
  static getById(userId, result) {
    const sqlQuery = `select id, firstname, lastname, email, mobile, doj from users where id=${db.escape(
      userId
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        const newUser = new User(res[0]);
        delete newUser.password;
        result(null, newUser);
        return;
      } else {
        result(null, null);
      }
    });
  }
  /**
   * @param {any} mobile
   * @param {{ (err: { message: any; }, data: any): void; (arg0: import("mysql").MysqlError, arg1: import("./users.model.js")): void; }} result
   */
  static getByMobile(mobile, result) {
    const sqlQuery = `select id, firstname, lastname, email, mobile, doj from users where mobile=${db.escape(
      mobile
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        const newUser = new User(res[0]);
        delete newUser.password;
        result(null, newUser);
        return;
      } else {
        result(null, null);
        return;
      }
    });
  }
  /**
   * @param {any} email
   * @param {{ (err: { message: any; }, data: any): void; (arg0: import("mysql").MysqlError, arg1: import("./users.model.js")): void; }} result
   */
  static getByEmail(email, result) {
    const sqlQuery = `select id, firstname, lastname, email, mobile, doj from users where email=${db.escape(
      email
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        if (res.length) {
          const newUser = new User(res[0]);
          delete newUser.password;
          result(null, newUser);
          return;
        } else {
          result(null, null);
          return;
        }
      }
    });
  }
  /**
   * @param {string} page
   * @param {(arg0: import("mysql").MysqlError, arg1: any) => void} result
   */
  static getAll(page, result) {
    let limit = `order by id desc limit ${(parseInt(page) - 1) * NUMBER_PER_PAGE},${NUMBER_PER_PAGE}`;
    let sqlQuery = `select count(*) as count from users;select id, firstname, lastname, email, mobile, doj from users ${limit}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        return result(err, null);
      }
      return result(null, res);
    });
  }
}

module.exports = User;
