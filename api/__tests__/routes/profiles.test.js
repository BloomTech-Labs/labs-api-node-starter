import request from 'supertest';
import express from 'express';
import * as Profiles from '../../models/profileModel';
import authRequired from '../../middleware/authRequired';
import profileRouter from '../../routes/profile';

const server = express();
jest.mock('../../models/profileModel');
jest.mock('../../middleware/authRequired', 
  () => jest.fn((req, res, next) => next()));

describe('profiles router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use('/profiles', profileRouter);
  });

  describe('GET /profiles', () => {
    it('should return 200', async () => {
      Profiles.findAll.mockResolvedValue([]);
      const res = await request(server).get('/profiles');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Profiles.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('GET /profiles/:id', () => {
    it('should return 200 when profile found', async () => {
      Profiles.findById.mockResolvedValue({
        id: 'd376de05-5f1b-4086-93b1-77681ca93614',
        name: 'Bob Smith',
        email: 'bob@example.com',
      });
      const res = await request(server).get(
        '/profiles/d376de05-5f1b-4086-93b1-77681ca93614'
      );

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Bob Smith');
      expect(Profiles.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Profiles.findById.mockResolvedValue();
      const res = await request(server).get(
        '/profiles/d376de05-5f1b-4086-93b1-77681ca9361d'
      );

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('ProfileNotFound');
    });
  });
});
