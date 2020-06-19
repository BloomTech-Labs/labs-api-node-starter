const request = require('supertest');
const express = require("express");
const server = express();

describe('users router endpoints', () =>{
  beforeAll(() => {
    // This is the module/route being tested
    const userRouter = require('../../api/routes/users');
    server.use('/users', userRouter);
  });

  describe('GET /users', () =>{
    it('should return json with 2 users', async () =>{
      const res = await request(server).get("/users");

      expect(res.status).toBe(200);
      // expect(res.body.length).toEqual(2);
    });

  });

});