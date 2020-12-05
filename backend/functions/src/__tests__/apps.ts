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

describe('Test the root path', () => {
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
