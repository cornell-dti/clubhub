const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clubhub-dev-89ca0.firebaseio.com",
});

const express = require("express");
const cors = require("cors");
const clubs = require("./clubs");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use("/clubs", clubs);

exports.app = functions.https.onRequest(app);
