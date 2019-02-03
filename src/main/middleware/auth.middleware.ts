export function authMiddleware(req, res, next) {
  const user =  req.session.user; 
  
  if (user.role === 1 || user.role === 2) {
    next();

  } else {
    res.sendStatus(401);
  }
}