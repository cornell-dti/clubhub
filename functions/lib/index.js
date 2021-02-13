"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const apps_1 = require("./apps");
const auth_1 = require("./auth");
const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: true }));
app.use(auth_1.authenticate);
app.use('/apps', apps_1.default);
exports.default = firebase_functions_1.https.onRequest(app);
//# sourceMappingURL=index.js.map