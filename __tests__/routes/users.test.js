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
    it('should return 200', async () =>{
      Users.findAll.mockResolvedValue([]);
      const res = await request(server).get("/users");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Users.findAll.mock.calls.length).toBe(1);
    });

  });

  describe('GET /users/:id', () => {
    
    it('should return 200 when user found', async () =>{
      Users.findById.mockResolvedValue({
        id: "d376de05-5f1b-4086-93b1-77681ca93614",
        name: "Bob Smith",
        email: "bob@example.com",
      });
      const res = await request(server).get("/users/d376de05-5f1b-4086-93b1-77681ca93614");

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("Bob Smith");
      expect(Users.findById.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () =>{
      Users.findById.mockResolvedValue();
      const res = await request(server).get("/users/d376de05-5f1b-4086-93b1-77681ca9361d");

      expect(res.status).toBe(404);
    });

  });

});