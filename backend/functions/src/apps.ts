import * as express from 'express';
import { DocumentSnapshot, Timestamp } from '@google-cloud/firestore';
import admin from './admin';

const router = express.Router();
const db = admin.firestore();

const appCollection = db.collection('apps');

type FirebaseApp = {
  clubName: string;
  appName: string;
  foldedName?: string;
  category: string;
  due: Timestamp;
  link: string;
  image?: string;
};

const docToApp = (doc: DocumentSnapshot) => {
  const data = doc.data() as FirebaseApp;
  return { ...data, due: data.due.toDate(), id: doc.id };
};

const foldName = (clubName: string) => clubName.toLowerCase().replace(/[^0-9A-Z]+/gi, '');

// Get All Apps
router.get('/', async (req, res) => {
  try {
    const query = appCollection
      .where('due', '>', Timestamp.now())
      .orderBy('due')
      .orderBy('foldedName');
    const response = await query.get();
    const apps = response.docs.map(docToApp);
    return res.status(200).send(apps);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

// Get Apps by Firebase ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = appCollection.doc(id);
    const doc = await query.get();
    if (!doc.exists) throw new Error("App doesn't exist");
    const app = docToApp(doc);
    return res.status(200).send(app);
  } catch (e) {
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
      .where('due', '>', Timestamp.now())
      .orderBy('due')
      .orderBy('foldedName');
    const response = await query.get();
    const apps = response.docs.map(docToApp);
    return res.status(200).send(apps);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

// Create Apps
router.post('/', async (req, res) => {
  try {
    const { due, clubName, appName, category, link } = req.body;
    const dateDue = new Date(due);
    const app: FirebaseApp = {
      clubName,
      appName,
      foldedName: foldName(clubName),
      category,
      due: Timestamp.fromDate(dateDue),
      link,
    };
    const doc = await appCollection.add(app);
    return res.status(200).send(doc.id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

export default router;
