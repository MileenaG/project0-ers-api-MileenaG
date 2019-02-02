import express from 'express'
import * as UserDao from '../dao/users.dao';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try { 
        const user = await UserDao.login(req.body.username, req.body.password);
        if (user) {
        req.session.user = user; 
        res.json(user);
        } else {
            res.sendStatus(400); //client side error
        }


    } catch (error) { 
        req.next();
    }

});


authRouter.get('/info', (req, res) => {
  res.json(req.session.user);
});