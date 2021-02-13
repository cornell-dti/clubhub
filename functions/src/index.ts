import { https } from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import apps from './apps';
import { authenticate } from './auth';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: true }));

app.use(authenticate);

app.use('/apps', apps);

export default https.onRequest(app);
