import * as admin from 'firebase-admin';
import * as firebaseKey from './_firebase-key.json';

const serviceAccount = firebaseKey as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clubhub-dev-89ca0.firebaseio.com',
});

export default admin;
