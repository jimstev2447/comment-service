process.env.NODE_ENV = 'test';
import supertest from 'supertest';
import { app } from '../src';
import { expect } from 'chai';
import connection from '../db/connection';

afterEach(() => {
  return connection.connect().then(() => {
    connection.getDb().collection('comments').drop();
  });
});
after(() => {
  return connection.close();
});

describe('app', () => {
  describe('/api/comment', () => {
    describe('POST', () => {
      it('201 responds with comment', () => {
        return supertest(app)
          .post('/api/comments')
          .send({ author: 'wayne', text: 'Party Time!', postId: 1 })
          .then((resp) => {
            expect(resp.status).to.equal(201);
            expect(resp.body.comment).to.haveOwnProperty('author', 'wayne');
            expect(resp.body.comment).to.haveOwnProperty('text', 'Party Time!');
            expect(resp.body.comment).to.haveOwnProperty('postId', 1);
            expect(resp.body.comment).to.haveOwnProperty('id');
            return resp;
          });
      });
      it('201 responds with comment', () => {
        return supertest(app)
          .post('/api/comments')
          .send({ author: 'wayne', text: 'Party Time!', postId: 1 })
          .then((resp) => {
            expect(resp.status).to.equal(201);
            expect(resp.body.comment).to.haveOwnProperty('author', 'wayne');
            expect(resp.body.comment).to.haveOwnProperty('text', 'Party Time!');
            expect(resp.body.comment).to.haveOwnProperty('postId', 1);
            expect(resp.body.comment).to.haveOwnProperty('id');
            return resp;
          });
      });
    });
  });
});
