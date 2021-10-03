const Card = require("../models/card.model");

const cardControllers = {
  create: (req, res) => {
    let {listId,cardId,title,description} = req.body
    new Card({listId,cardId,title,description}).create(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where creating card",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  update: (req, res) => {
    let {listId,title,description} = req.body
    new Card({listId,title,description,cardId:req.params.id}).update(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where update card",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
  delete: (req, res) => {
    new Card({cardId:req.params.id}).delete(
      (/** @type {{ message: any; }} */ err, /** @type {any} */ data) => {
        if (err)
          res.status(500).send({
            message: "Error where deleting card",
          });
        else if (data) res.send(data);
        else res.sendStatus(404);
      }
    );
  },
};
module.exports = cardControllers;
