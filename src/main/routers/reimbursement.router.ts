import express from 'express';
import * as ReimDao from '../dao/reimbursements.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { asMiddleware } from '../middleware/associate.middleware';



export const reimRouter = express.Router();
//add reimbursements in front of all path for UI


//find all
reimRouter.get('/reimbursements',
async (req, res) => {
  let id = req.session.user.userid;
  console.log('The id id here: '+id);
    try {
      if(req.session.user.role === 1 || req.session.user.role === 2) {
      const reim = await ReimDao.findAllReim();
      res.status(200);
      res.json(reim);
      } else {
        const reims = await ReimDao.findByUser(id);
        res.status(200);
        res.json(reims); 
      }
    } catch (err) {
      res.sendStatus(500);
    }
  });

//find by status
reimRouter.get('reimbursements/status/:statusId', [
    authMiddleware, 
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
/* reimRouter.get('reimbursements/author/userId/:id', [
  authMiddleware,
  async (req, res) => {
    const idParam = +req.params.id;
    try {
      const reimbursement = await ReimDao.findByUser(idParam);
      res.json(reimbursement);
    } catch (err) {
      res.sendStatus(500);
  }
}]);
 */

//submit reimbursements
reimRouter.post('', async (req, res) => {

  try {

  
    const reimbursement = await ReimDao.submitReim(req.body);
    res.status(200);
 
    res.json(reimbursement); 
  } catch (err) {

    console.log(err);
    res.sendStatus(500); 
  }
});

//update reimbursements
reimRouter.patch('/reimbursements', [
  authMiddleware,
  async (req, res) => {
  try {
    console.log('We send this to the dao', req.body);
    const reimbursement = await ReimDao.update(req.body);
    res.status(200);
    res.json(reimbursement);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}]);