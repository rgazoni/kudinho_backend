import express from "express";
// import 'express-async-errors';
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { newKudoRouter } from "./routes/new-kudo";
import { readNewKudoRouter } from "./routes/read-new-kudos";
import { archivedKudosRouter } from "./routes/archived-kudos";
import { signupTeam } from "./routes/signup-team";
import { signin } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { updateKudoRouter } from "./routes/update-kudos";
import { userIsLoggedRouter } from "./routes/user-is-logged";

const app = express();

app.set("trust proxy", true);
app.use(json());
// Errors with credentials and CORS, refer to
// https://stackoverflow.com/questions/14003332/access-control-allow-origin-wildcard-subdomains-ports-and-protocols
// https://stackoverflow.com/questions/8074665/cross-origin-resource-sharing-with-credentials
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "http://localhost:3000",
    preflightContinue: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
    //allowedHeaders: ['Content-Type', 'Authorization']
  }),
);

app.use(cookieParser("segredo"));

// declare module "express-session" {
//   interface SessionData {
//     team_code: string;
//   }
// }

app.use(newKudoRouter);
app.use(updateKudoRouter);
app.use(readNewKudoRouter);
app.use(archivedKudosRouter);
app.use(signupTeam);
app.use(signin);
app.use(signoutRouter);
app.use(userIsLoggedRouter);

//We have installed a library to workaround the default pattern that
//JS deals with throw and async communication
// app.all('*', async (req, res) => {
//     throw new NotFoundError();
// });

// app.use(errorHandler);

export { app };
