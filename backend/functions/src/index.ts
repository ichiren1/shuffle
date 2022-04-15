import * as functions from "firebase-functions";
import express from "express";
import { router } from "./router";

const app = express();

app.use("/v1", router);

export const api = functions.https.onRequest(app);
