"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const admin_1 = require("./admin");
const allowlistCollection = admin_1.db.collection('allowlist');
const authenticate = async (req, res, next) => {
    const header = req.headers.authorization;
    if (header) {
        const [authType, authToken] = header.split(' ');
        if (authType === 'Bearer') {
            req.user = await admin_1.auth.verifyIdToken(authToken);
        }
    }
    next();
};
exports.authenticate = authenticate;
const checkAllowlist = async (email) => {
    if (!email)
        return false;
    const snapshot = await allowlistCollection.doc(email).get();
    return snapshot.exists;
};
const authorize = async (user) => {
    return checkAllowlist(user === null || user === void 0 ? void 0 : user.email);
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map