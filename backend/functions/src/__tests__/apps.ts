import * as request from 'supertest';
import server from '../index';

describe('Test ', () => {
  it('should response the GET method', (done) => {
    request(server)
      .get('/apps')
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
