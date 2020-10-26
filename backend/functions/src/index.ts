import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as firebaseKey from './firebase-key.json';

import clubs from './clubs';

const serviceAccount = firebaseKey as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clubhub-dev-89ca0.firebaseio.com',
});

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: true }));

app.use('/clubs', clubs);

export default functions.https.onRequest(app);
