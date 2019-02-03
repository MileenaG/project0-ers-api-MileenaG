import express from 'express'
import * as UserDao from '../dao/users.dao';

export const authRouter = express.Router();

authRouter.post('', 
    async (req, res) => {
        try { 
            const user = await UserDao.login(req.body.username, req.body.password);
            console.log(user);
            console.log('left user DAO');
        
            if (user !== undefined) {
                user.password = '';

                let newuser = {
                    id: user.userId,
                    username: user.username,
                    password: '', // don't send back the passwords
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }

            req.session.user = newuser;
            console.log(user); 
            res.json(user);
            } else {
                res.send('Invalid Cridentials'); //client side error
            }

            } catch (error) { 
                req.next();
            }

    });


authRouter.get('/info', (req, res) => {
  res.json(req.session.user);
});