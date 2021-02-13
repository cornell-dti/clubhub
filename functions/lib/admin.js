"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const admin = require("firebase-admin");
const firebaseKey = require("./firebase-key.json");
const serviceAccount = firebaseKey;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://clubhub-dev-89ca0.firebaseio.com',
});
const db = admin.firestore();
exports.db = db;
const auth = admin.auth();
exports.auth = auth;
//# sourceMappingURL=admin.js.map