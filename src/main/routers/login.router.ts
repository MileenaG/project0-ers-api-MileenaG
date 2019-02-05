import express from 'express'
import * as UserDao from '../dao/users.dao';

export const authRouter = express.Router();

authRouter.post('', 
    async (req, res) => {
        try { 
            const user = await UserDao.login(req.body.username, req.body.password);
            console.log(user);
        
            if (user !== undefined) {
                user.password = '';

                let newuser = {
                    userid: user.userid,
                    username: user.username,
                    password: '', // don't send back the passwords
                    firstName: user.firstname,
                    lastName: user.lastname,
                    email: user.email,
                    role: user.role
                }

            req.session.user = newuser;
            console.log(req.session.user); 
            res.json(user);
            } else {
                res.send('Invalid Cridentials'); //client side error
            }

            } catch (error) { 
                req.next();
            }

    });
