import express, { Request, Response } from "express";
import { Team } from "../models/Team";
import { Administrator } from "../models/Administrator";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { uuid } from "uuidv4";

const router = express.Router();

router.post(
  "/api/auth/signup-team",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, teamName, companyName, teamSize } = req.body;

    const timestamp = Date.now();
    const team_id = uuid();
    const team_code = team_id.substring(0, 5);

    const team = Team.build({
      team_id: team_id,
      timestamp: timestamp,
      team_name: teamName,
      company_name: companyName,
      size_team: teamSize,
      team_code: team_code,
    });
    await team.save();

    const admin = Administrator.build({
      team_id: team_id,
      admin_email: email,
      created_at: timestamp,
    });
    await admin.save();

    res
      .status(201)
      .send({ message: "Success", status: true, team_code: team_code });
  },
);

export { router as signupTeam };
