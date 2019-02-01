import * as  express from 'express';
import { User } from '../models/users';
import * as UserDao from '../dao/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';
import { Role } from '../models/role';

const peter = new User(1, 'MG', 'password', 'Mileena', 'Garcia', 'mg@gmail.com', new Role(2, 'admin'));
const users = [
  peter
];

// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

/* // /users - find all
userRouter.get('', [
  authMiddleware,
  (req, res) => {
    res.json(users);
  }]);
  
  // /users/:id - find by id
  userRouter.get('/:id', (req, res) => {
    console.log(req.params);
    const idParam = +req.param['userId']
                                        // +'1' - will convert to number
    const user = users.find(ele => ele.userId=== idParam )
      
      //ele => ele.userId === idParam); 
    res.json(user);
  });
  
  userRouter.post('', (req, res) => {
    users.push(req.body);
    res.sendStatus(201);
  });

 */



// /users - find all
// userRouter.get('', [
//   // authMiddleware,
//   async (req, res) => {
//     // res.json(users);
//     try {
//       const users = await UserDao.findAll();
//       res.json(users);
//     } catch (err) {
//       res.sendStatus(500);
//     }
//   }]);

// // /users/:id - find by id
// userRouter.get('/:id', async (req, res) => {
//   console.log(req.params);
//   const idParam = +req.params.id;
//   // +'1' - will convert to number
//   // const user = users.find(ele => ele.id === idParam);
//   try {
//     const user = await UserDao.findById(idParam);
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

userRouter.post('', async (req, res) => {
  // users.push(req.body);
  try {
  //   //const user = await UserDao.save(req.body);
  //   res.status(201);
  //   //res.json(user);
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(500);
  // }
});