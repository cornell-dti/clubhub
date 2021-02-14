import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { auth, db } from './admin';

const allowlistCollection = db.collection('allowlist');

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization;
  if (header) {
    const [authType, authToken] = header.split(' ');
    if (authType === 'Bearer') {
      req.user = await auth.verifyIdToken(authToken);
    }
  }
  next();
};

const checkAllowlist = async (email?: string): Promise<boolean> => {
  if (!email) return false;
  const snapshot = await allowlistCollection.doc(email).get();
  return snapshot.exists;
};

const authorize = async (user?: admin.auth.DecodedIdToken): Promise<boolean> => {
  return checkAllowlist(user?.email);
};

export { authenticate, authorize };
