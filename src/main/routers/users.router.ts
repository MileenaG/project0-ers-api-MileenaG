import express from 'express';
import * as UserDao from '../dao/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

// start with '/users'
export const userRouter = express.Router();

//users - find all
userRouter.get('', [
    authMiddleware,
    async (req, res) => {
      try {
        const users = await UserDao.findAll();
        res.json(users);
      } catch (err) {
        res.sendStatus(500);
      }
    }]); 


// /users/:id - find by id
userRouter.get('/:id', [
  authMiddleware,
  async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.id;
    try {
      const user = await UserDao.findById(idParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
}]);

//update user
userRouter.patch('/', [
  adminMiddleware, 
  async (req, res) => {
  try {
    console.log('We send this to the dao', req.body);
    const user = await UserDao.update(req.body);
    res.status(201);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);
