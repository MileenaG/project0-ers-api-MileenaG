import express from 'express';
import { users } from '../models/users';
import { authMiddleware } from '../middleware/auth.middleware';

const peter = new users(1, 'peter', 'password', 'peter');
const kyle = new users(2, 'kyle', 'password', 'kyle');
const users = [
  peter,
  kyle
];

// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

// /users - find all
userRouter.get('', [
authMiddleware,
(req, res) => {
  res.json(users);
}]);

// /users/:id - find by id
userRouter.get('/:id', (req, res) => {
  console.log(req.params);
  const idParam = +req.params.id;
                                      // +'1' - will convert to number
  const user = users.find(ele => ele.id === idParam);
  res.json(user);
});

userRouter.post('', (req, res) => {
  users.push(req.body);
  res.sendStatus(201);
});