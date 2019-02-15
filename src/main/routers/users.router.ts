import express from 'express';
import * as UserDao from '../dao/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';
import { asMiddleware } from '../middleware/associate.middleware';

// start with '/users'
export const userRouter = express.Router();

//users - find all
userRouter.get('/users', async (req, res) => {

      console.log("IM AT THE ROUTER")

      let ID =req.session.user.userid;

      try {
        if(req.session.user.role === 1 || req.session.user.role === 2) {
          const user = await UserDao.findAll();
          res.status(200);
          res.json(user);
      } else {
        const users = await UserDao.findById(ID);
        res.status(200);
        res.json(users);
      
      }
     } catch (err) {
        res.sendStatus(500);
      }
    }); 


// /users/:id - find by id
/* userRouter.get('users/:id', [
  authMiddleware,
  async (req, res) => {
    console.log(req.params);
    const idParam = +req.params.id;
    try {
      if(req.session.user.role === 1 || req.session.user.role === 2) 
      const user = await UserDao.findById(idParam);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
  }
}]); */
//maybe need to add users in front of path
//update user
userRouter.patch('/users', [
  adminMiddleware, 
  async (req, res) => {
  try {
    console.log('We send this to the dao', req.body);
    const user = await UserDao.update(req.body);
    res.status(200);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);
