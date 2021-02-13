import * as admin from 'firebase-admin';

declare global {
  namespace Express {
    export interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}
