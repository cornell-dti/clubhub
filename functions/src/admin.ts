import * as admin from 'firebase-admin';
import * as firebaseKey from './firebase-key.json';

const serviceAccount = firebaseKey as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clubhub-dev-89ca0.firebaseio.com',
});

const db = admin.firestore();
const auth = admin.auth();

export { db, auth }