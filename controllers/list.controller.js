const List = require("../models/lists.model");

const listControllers = {
  create: (req, res) => {
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
  update: (req, res) => {
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
  delete: (req, res) => {
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
  getAll: (req, res) => {
    List.getAll((err, data) => {
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
