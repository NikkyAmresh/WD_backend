const Card = require("../models/card.model");

const cardControllers = {
  create: (/** @type {{ body: { listId: any; cardId: any; title: any; description: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
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
  update: (/** @type {{ body: { listId: any; title: any; description: any; }; params: { id: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
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
  delete: (/** @type {{ params: { id: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; send: { (arg0: { message: string; }): void; new (): any; }; }; send: (arg0: any) => void; sendStatus: (arg0: number) => void; }} */ res) => {
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
