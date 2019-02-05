import express from 'express';
import * as ReimDao from '../dao/reimbursements.dao';
import { authMiddleware } from '../middleware/auth.middleware';


export const reimRouter = express.Router();

//find by status
reimRouter.get('/status/:statusId', [
    authMiddleware,     //Do I want it to go through middleware? 
    async (req, res) => {
      const idParam = +req.params.statusId
      try {
        const reimbursements = await ReimDao.findByStatus(idParam);
        res.json(reimbursements); //response-what shows up on postman
      } catch (err) {
        res.sendStatus(500);
      }
    }]); 


// find by user ID /reimbursements/author/userId/:userId
reimRouter.get('/author/userId/:userId', [
  authMiddleware,
  async (req, res) => {
    const idParam = +req.params.userId;
    try {
      const reimbursement = await ReimDao.findByUser(idParam);
      res.json(reimbursement);
    } catch (err) {
      res.sendStatus(500);
  }
}]);


//submit reimbursements
/* reimRouter.post('', async (req, res) => {
  try {
    const reimbursement = await ReimDao.submitReim(req.body);
    res.status(200);
    res.json(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}); */


//update reimbursements
reimRouter.patch('/', [
  authMiddleware,
  async (req, res) => {
  try {
    console.log('We send this to the dao', req.body);
    const reimbursement = await ReimDao.update(req.body);
    res.status(201);
    res.json(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);