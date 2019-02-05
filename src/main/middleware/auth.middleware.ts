export function authMiddleware(req, res, next) {
  let user =  req.session.user; 
  console.log('Middleware ' + user.userid);
  if (user.userid === +req.params.id) {
    console.log('User Id = req Id')
     next();
  } else if(user && user.role === 1 || user.role === 2){
    next();
    }
    else {
    res.sendStatus(401)
    }
}
