"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const firestore_1 = require("@google-cloud/firestore");
const admin_1 = require("./admin");
const auth_1 = require("./auth");
const router = express.Router();
const appCollection = admin_1.db.collection('apps');
const docToApp = (doc) => {
    const data = doc.data();
    return Object.assign(Object.assign({}, data), { due: data.due.toDate(), id: doc.id });
};
const foldName = (clubName) => clubName.toLowerCase().replace(/[^0-9A-Z]+/gi, '');
// Get All Unexpired Apps
router.get('/', async (req, res) => {
    try {
        const query = appCollection
            .where('due', '>', firestore_1.Timestamp.now())
            .orderBy('due')
            .orderBy('foldedName');
        const response = await query.get();
        const apps = response.docs.map(docToApp);
        return res.status(200).send(apps);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Get Apps by Firebase ID
router.get('/byId/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = appCollection.doc(id);
        const doc = await query.get();
        if (!doc.exists)
            throw new Error("App doesn't exist");
        const app = docToApp(doc);
        return res.status(200).send(app);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Get Apps by Category
router.get('/byCategory/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const query = appCollection
            .where('category', '==', category)
            .where('due', '>', firestore_1.Timestamp.now())
            .orderBy('due')
            .orderBy('foldedName');
        const response = await query.get();
        const apps = response.docs.map(docToApp);
        return res.status(200).send(apps);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Get All Apps Including Expired
router.get('/all/', async (req, res) => {
    try {
        const authorized = await auth_1.authorize(req.user);
        if (!authorized) {
            return res.status(401).send("Not Authenticated!");
        }
        const query = appCollection.orderBy('due').orderBy('foldedName');
        const response = await query.get();
        const apps = response.docs.map(docToApp);
        return res.status(200).send(apps);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Create App
router.post('/', async (req, res) => {
    try {
        const authorized = await auth_1.authorize(req.user);
        if (!authorized) {
            return res.status(401).send("Not Authenticated!");
        }
        const { due, clubName, appName, category, link, image } = req.body;
        const dateDue = new Date(due);
        const app = {
            clubName,
            appName,
            foldedName: foldName(clubName),
            category,
            due: firestore_1.Timestamp.fromDate(dateDue),
            link,
            image,
        };
        const doc = await appCollection.add(app);
        return res.status(200).send(doc.id);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Update App
router.post('/:id', async (req, res) => {
    try {
        const authorized = await auth_1.authorize(req.user);
        if (!authorized) {
            return res.status(401).send("Not Authenticated!");
        }
        const { id } = req.params;
        const { due, clubName, appName, category, link, image } = req.body;
        const dateDue = new Date(due);
        const app = {
            clubName,
            appName,
            foldedName: foldName(clubName),
            category,
            due: firestore_1.Timestamp.fromDate(dateDue),
            link,
            image,
        };
        await appCollection.doc(id).update(app);
        return res.status(200).send(id);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
// Delete App
router.delete('/:id', async (req, res) => {
    try {
        const authorized = await auth_1.authorize(req.user);
        if (!authorized) {
            return res.status(401).send("Not Authenticated!");
        }
        const { id } = req.params;
        await appCollection.doc(id).delete();
        return res.status(200).send('Deleted');
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return res.status(500).send(e.message);
    }
});
exports.default = router;
//# sourceMappingURL=apps.js.map