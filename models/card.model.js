"use strict";
const db = require("./db.js");
class Card {
  /**
     * @param {{ req?: any; id?: any; cardId?: any;listId?: any;level?: any; title?: any; description?: any; }} Card
     */
  constructor(Card) {
    this.id = Card.id;
    this.cardId = Card.cardId;
    this.listId = Card.listId;
    this.title = Card.title;
    this.level = Card.level;
    this.description = Card.description;
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  create(result) {
    const sqlQuery = `INSERT INTO cards (id, card_id, list_id, title, description) VALUES (NULL, ${db.escape(this.cardId)},${db.escape(this.listId)}, ${db.escape(this.title)}, ${db.escape(this.description)})`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  get(result) {
    const sqlQuery = `select * from  cards where card_id=${db.escape(this.cardId)})`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  }
  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  delete(result) {
    const sqlQuery = `delete from cards where card_id=${db.escape(
      this.cardId
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  deleteByList(result) {
    const sqlQuery = `delete from cards where list_id=${db.escape(
      this.listId
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  update(result) {
    const sqlQuery = `update cards set list_id=${db.escape(this.listId)},title=${db.escape(this.title)},description=${db.escape(this.description)} where card_id=${db.escape(
      this.cardId
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, this);
    });
  }


}

module.exports = Card;
