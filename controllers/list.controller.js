const List = require("../models/lists.model");

const listControllers = {
  create: (/** @type {{ body: { listId: any; id?: any; level?: any; title?: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
    new List(req.body).create(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where creating list",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  update: (/** @type {{ body: { level: any; title: any; }; params: { id: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
    const { level, title } = req.body;
    new List({ listId: req.params.id, level, title }).update(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where update list",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  delete: (/** @type {{ params: { id: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
    new List({ listId: req.params.id }).delete(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where deleting list",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  getAll: (/** @type {any} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
    List.getAll((/** @type {any} */ err, /** @type {any} */ data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Error where getting list",
        });
      } else if (data) {
        res.send(data);
      } else res.sendStatus(404);
    });
  },
};
module.exports = listControllers;
