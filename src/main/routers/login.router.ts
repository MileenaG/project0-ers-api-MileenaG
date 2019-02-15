import express from 'express'
import * as UserDao from '../dao/users.dao';

export const loginRouter = express.Router();

loginRouter.post('', 
    async  (req, res) => {
        try { 
           // console.log("at the router")
            const user = await UserDao.login(req.body.username, req.body.password);
           // console.log(user);
        
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
        console.log("this is the  new guy" + newuser);
            req.session.user = newuser;
            //console.log(req.session.user.role); 
            res.json(user);
            } else {
                res.send('Invalid Cridentials'); //client side error
            }

            } catch (error) { 
                req.next();
            }

    });
