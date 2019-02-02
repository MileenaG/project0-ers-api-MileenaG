export function authMiddleware(req, res, next) {
  const user = req.session.user; //empty 
  console.log(user)
  if (user && user.role === 'Admin') {
    next();
  } else {
    res.sendStatus(401);
    console.log('Accesss Denied');
  }
}