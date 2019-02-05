export function adminMiddleware(req, res, next) {
    let user =  req.session.user; 
    if (user && user.role === 1) {
       next();
    } 
      else {
      res.sendStatus(401)
      }
  }