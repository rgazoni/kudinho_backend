import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/auth/userislogged",
  currentUser,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      console.log("User is not logged!");
      return res.status(400).send({
        status: 400,
        message: "User isn't logged in",
        redirect: "/login",
        isLogged: false,
      });
    }
    res.status(200).send({
      status: 200,
      message: "User is logged",
      redirect: "/",
      isLogged: true,
    });
  },
);

export { router as userIsLoggedRouter };
