import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/auth/signout", async (req: Request, res: Response) => {
  res
    .clearCookie("kudinho_platform")
    .status(200)
    .send({ message: "Success", status: true });
});

export { router as signoutRouter };
