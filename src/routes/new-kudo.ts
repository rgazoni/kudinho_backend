import express, { Request, Response } from "express";
import { Kudo } from "../models/Kudo";
import { Team } from "../models/Team";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.post(
  "/api/newkudo",
  [body("to").isString(), body("from").isString(), body("message").isString()],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { to, from, message } = req.body;

    if (!req.currentUser) {
      console.log("Internal Error");
      return res
        .status(400)
        .send({ status: 400, message: "User isn't logged in" });
    }

    const timestamp = Date.now();
    const kudo = Kudo.build({
      team_id: req.currentUser.team_id,
      timestamp: timestamp,
      to: to,
      from: from,
      message: message,
    });
    await kudo.save();

    res.status(201).send(kudo);
  },
);

export { router as newKudoRouter };
