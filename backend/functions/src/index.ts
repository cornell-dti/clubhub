import { https } from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import clubs from './clubs';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors({ origin: true }));

app.use('/clubs', clubs);

export default https.onRequest(app);
