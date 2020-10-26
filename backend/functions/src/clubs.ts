import * as express from 'express';
import { DocumentSnapshot, Timestamp } from '@google-cloud/firestore';
import admin from './admin';

const router = express.Router();
const db = admin.firestore();

type FirebaseClub = {
  name: string;
  foldedName?: string;
  category: string;
  due: Timestamp;
  link: string;
  image?: string;
};

const docToClub = (doc: DocumentSnapshot) => {
  const data = doc.data() as FirebaseClub;
  return { ...data, due: data.due.toDate(), id: doc.id };
};

const foldName = (name: string) => name.toLowerCase().replace(/[^0-9A-Z]+/gi, '');

// Get All Clubs
router.get('/', async (req, res) => {
  try {
    const query = db
      .collection('clubs')
      .where('due', '>', Timestamp.now())
      .orderBy('due')
      .orderBy('foldedName');
    const response = await query.get();
    const clubs = response.docs.map(docToClub);
    return res.status(200).send(clubs);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

// Get Club by Firebase ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = db.collection('clubs').doc(id);
    const doc = await query.get();
    if(!doc.exists) throw new Error("Club doesn't exist");
    const club = docToClub(doc);
    return res.status(200).send(club);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

// Get Clubs by Category
router.get('/byCategory/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const query = db
      .collection('clubs')
      .where('category', '==', category)
      .where('due', '>', Timestamp.now())
      .orderBy('due')
      .orderBy('foldedName');
    const response = await query.get();
    const clubs = response.docs.map(docToClub);
    return res.status(200).send(clubs);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

// Create Club
router.post('/', async (req, res) => {
  try {
    const { due, name, category, link } = req.body;
    const dateDue = new Date(due);
    const club: FirebaseClub = {
      name,
      foldedName: foldName(name),
      category,
      due: Timestamp.fromDate(dateDue),
      link,
    };
    const doc = await db.collection('clubs').add(club);
    return res.status(200).send(doc.id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).send(e.message);
  }
});

export default router;
