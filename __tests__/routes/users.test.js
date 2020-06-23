const request = require('supertest');
const express = require("express");
const server = express();
var Users = require('../../api/models/userModel');
jest.mock('../../api/models/userModel');

describe('users router endpoints', () =>{
  beforeAll(() => {
    // This is the module/route being tested
    const userRouter = require('../../api/routes/users');
    server.use('/users', userRouter);
  });

  describe('GET /users', () =>{
    it('should call model once', async () =>{
      Users.get.mockResolvedValue([]);
      const res = await request(server).get("/users");

      expect(res.status).toBe(200);
      expect(Users.get.mock.calls.length).toBe(1);
    });

  });

});