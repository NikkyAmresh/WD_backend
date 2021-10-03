"use strict";
const Card = require("./card.model.js");
const db = require("./db.js");
class List {
  /**
   * @param {{ listId: any; id?: any; level?: any; title?: any; }} List
   */
  constructor(List) {
    this.id = List.id;
    this.listId = List.listId;
    this.level = List.level;
    this.title = List.title;
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  create(result) {
    const sqlQuery = `INSERT INTO lists (id, list_id, level, title) VALUES (NULL, ${db.escape(this.listId)}, ${db.escape(this.level)}, ${db.escape(
      this.title
    )})`;
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
    const sqlQuery = `select * from lists where card_id=${db.escape(
      this.listId
    )})`;
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
    const sqlQuery = `delete from lists where list_id=${db.escape(
      this.listId
    )}`;
    db.query(sqlQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      new Card({ listId: this.listId }).deleteByList((/** @type {any} */ err, /** @type {any} */ res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, this);
      });
    });
  }

  /**
   * @param {{
   * (err: any, data: any): void;
   * (err: any, data: any): void;
   * (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  update(result) {
    const sqlQuery = `update lists set title=${db.escape(
      this.title
    )},level=${db.escape(this.level)} where list_id=${db.escape(this.listId)}`;
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
   * @param {{ (err: any, data: any): void; (arg0: import("mysql").MysqlError, arg1: any): void; }} result
   */
  static getAll(result){
    const sqlQuery = `select * from lists order by level;select * from cards`;
    db.query(sqlQuery,(err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      let [lists,cards] = res;
      lists = JSON.parse(JSON.stringify(lists));
      cards = JSON.parse(JSON.stringify(cards));
      lists.forEach((/** @type {{ cards: any; list_id: any; }} */ list)=>{
        list.cards = cards.filter((/** @type {{ list_id: any; }} */ card)=>card.list_id==list.list_id);
      })
      console.log(lists)
      result(null,lists);
    })
  }
}

module.exports = List;
