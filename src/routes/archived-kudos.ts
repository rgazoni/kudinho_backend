import express, { Request, Response } from "express";
import { Kudo } from "../models/Kudo";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/archivedkudos",
  currentUser,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      console.log("Internal Error");
      return res
        .status(400)
        .send({ status: 400, message: "User isn't logged in" });
    }

    const filterKudos = {
      isKudoReaded: true,
      team_id: req.currentUser.team_id,
    };

    const archivedKudos = await Kudo.find(filterKudos);

    res.status(200).send(archivedKudos);
  },
);

export { router as archivedKudosRouter };
