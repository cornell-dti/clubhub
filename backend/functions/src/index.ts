import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.cert(require("../firebase-key.json")),
  databaseURL: "https://clubhub-dev-89ca0.firebaseio.com",
});

import * as express from "express";
import * as cors from "cors";
import clubs from "./clubs";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors({ origin: true }));
app.use("/clubs", clubs);

export default functions.https.onRequest(app);
