import express, { Request, Response } from "express";
import { Team } from "../models/Team";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/auth/signin", async (req: Request, res: Response) => {
  const { team_code } = req.body;

  const teamCode = team_code.toLowerCase();

  const filter = { team_code: teamCode };
  const code = await Team.findOne(filter);

  if (!code) {
    console.log(`Your team wasn't found ${teamCode}!`);
    return res.status(400).send({
      message: "Your team wasn't found!",
      team_code: teamCode,
      status: false,
    });
  }

  console.log(code);
  //Store it on session obj

  // Generate JWT
  const userJwt = jwt.sign(
    {
      team_code: teamCode,
      team_id: code.team_id,
      team_name: code.team_name,
    },
    "segredo",
  );

  res
    .cookie("kudinho_platform", userJwt, {
      signed: true,
      //maxAge: 5000,
      httpOnly: true,
      //IDK why but secure is breaking Cookies. I will need to search for it later
      // secure: true,
    })
    .status(200)
    .send({ message: "Success", status: true, team_code: teamCode });
});

export { router as signin };
