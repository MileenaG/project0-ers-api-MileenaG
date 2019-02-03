export function authMiddleware(req, res, next) {
  const user =  req.session.user; 
  if (user.role === 1 || user.role === 2) { //must be admin or financial manager
     //don't forget to add if ID matches current user
     next();
  } else {
    res.sendStatus(401)//.json({
      //status: 401,
      //message: 'UNAUTHORIZED'
    //});
  }
}