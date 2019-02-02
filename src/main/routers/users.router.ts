import express from 'express';
//import { User } from '../models/users';
import * as UserDao from '../dao/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';

// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

//users - find all
userRouter.get('', [
  authMiddleware,  //what is this middleware doing? 
                  //I have to put cridentials into postman or else I can't access users (just by id)
  async (req, res) => {
    // res.json(users);
    try {
      const users = await UserDao.findAll();
      console.log('In user router');
      console.log(users);
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
  // +'1' - will convert to number
  // const user = users.find(ele => ele.id === idParam);
    try {
      const user = await UserDao.findById(idParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
}]);

//add new user
userRouter.post('', async (req, res) => {
  // users.push(req.body);
  try {
    const user = await UserDao.save(req.body);
    res.status(201);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});