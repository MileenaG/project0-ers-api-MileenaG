export function asMiddleware(req, res, next) {
    let user =  req.session.user; 
   // console.log('In middleware getting userid' + user.userid);
    //console.log('In middleware getting role ' + user.role);
    if (user && user.role === 1 || user.role === 2 || user.role ===3) {
       next();
    }
   // } else if(user && user.role === 1 || user.role === 2 || user.role ===3){
   //   next();
      
      else {
      res.sendStatus(401)
      }
  }