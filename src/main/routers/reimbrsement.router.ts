import express from 'express';
import * as RiemDao from '../dao/reimbursements.dao';
import { authMiddleware } from '../middleware/auth.middleware';


export const riemRouter = express.Router();

//users - find all
/* userRouter.get('', [
  async (req, res) => {
    try {
      let users = await UserDao.allReim();
      res.json(users);
    } catch (err) {
      res.sendStatus(500);
    }
  }]); */


//find by status
riemRouter.get('/status/:statusId', [
    authMiddleware,     //Do I want it to go through middleware? 
    async (req, res) => {
      const idParam = +req.params.statusId
      try {
        const reimbursements = await RiemDao.findByStatus(idParam);
        res.json(reimbursements); //response-what shows up on postman
      } catch (err) {
        res.sendStatus(500);
      }
    }]); 


// find by user ID /reimbursements/author/userId/:userId
riemRouter.get('/author/userId/:userId', [
  authMiddleware,
  async (req, res) => {
    const idParam = +req.params.userId;
    try {
      const user = await RiemDao.findByUser(idParam);
      res.json(user);
    } catch (err) {
      res.sendStatus(500);
  }
}]);


//submit reimbursements


//update reimbursements