import express, { Request, Response } from "express";
import { Kudo } from "../models/Kudo";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.post(
  "/api/readnewkudos",
  currentUser,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      console.log("Internal Error");
      return res
        .status(400)
        .send({ status: 400, message: "User isn't logged in" });
    }

    // Filter their unreaded kudos
    const filterKudos = {
      team_id: req.currentUser.team_id,
      isKudoReaded: false,
    };
    const kudos_data = await Kudo.find(filterKudos);
    res
      .status(200)
      .send({ kudos_data: kudos_data, team_name: req.currentUser.team_name });
  },
);

export { router as readNewKudoRouter };
