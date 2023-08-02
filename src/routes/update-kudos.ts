import express, { Request, Response } from "express";
import { Query } from "mongoose";
import { Kudo } from "../models/Kudo";

const router = express.Router();

router.post("/api/updatekudos", async (req: Request, res: Response) => {
  const { ids } = req.body;
  console.log(req.body);
  const query = new Query();
  query.find().where("_id").in(ids);

  const update = await Kudo.updateMany(query.getQuery(), {
    isKudoReaded: true,
  });
  res.status(201).send(update);
});

export { router as updateKudoRouter };
