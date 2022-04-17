import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { router } from "./router";

const app = express();
app.use(cors({ origin: true }));

app.use("/v1", router);

export const api = functions.https.onRequest(app);
