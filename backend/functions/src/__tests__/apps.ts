import * as request from 'supertest';
import server from '../index';

type ResponseDoc = {
  appName: string;
  clubName: string;
  foldedName?: string;
  category: string;
  due: string;
  link: string;
  image?: string;
};

const SAMPLE_CLUBNAME = 'Cornell ACM Programming';

describe('Test the root endpoint', () => {
  it('should check status code & date filtering', (done) => {
    request(server)
      .get('/apps')
      .expect(200)
      .then((res) => {
        Array.prototype.forEach.call(res.body, (doc: ResponseDoc) => {
          const now = Date.now();
          const appDue = Date.parse(doc.due);
          expect(now).toBeLessThan(appDue);
        });
        done();
      });
  });
});

describe('Test the /:id endpoint', () => {
  it('should check status code & date filtering', (done) => {
    request(server)
      .get('/apps/1TdY0pXQUMbdqoz5v72B')
      .expect(200)
      .then((res) => {
        const doc: ResponseDoc = JSON.parse(res.text);
        expect(doc.clubName).toBe(SAMPLE_CLUBNAME);
        done();
      });
  });
});
