import express = require('express')
import bodyParser from 'body-parser';
import { userRouter } from './routers/users.router';
import session from 'express-session';
import { loginRouter } from './routers/login.router';
import { reimRouter } from './routers/reimbursement.router';

const app = express();

app.use((req, resp, next) => {
  resp.header('Access-Control-Allow-Origin', `http://localhost:3000`);
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  next();
 })


 app.use('/login', express.static('webpages'));
 app.use('', express.static('webpages')); //homepage
 app.use('/users', express.static('webpages'));

// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
  secret: 'potato',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};
// prior to this req.sesssion is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));



/* app.use((req, resp, next) => {
    (process.env.MOVIE_API_STAGE === 'prod')
     / ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `http://localhost:3000`); //this is where we're hosting the UI part
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
   }); */

   let  path = require('path');
   app.get('', async  function (req,res){ 
    await res.sendFile(path.resolve('webpages/homepage/index.html') //also not set up yet
    )
  });
  
  
  app.get('/login', async function (req,res){ 
    await res.sendFile(path.resolve('webpages/login/login.html')
    )
  });
  
  //app.get('/reimbursements', async function (req,res){ 
    //await res.sendFile(path.resolve('webpages/reim/reim.html')
    //)
  //});
  app.get('/users', async function (req,res){ 
    await res.sendFile(path.resolve('webpages/users/users.html')
    )
  });
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimRouter);


//app.use('/reimbursements', express.static( 'webpages')) //not set up yet




//This is the port we're using
let port = 3000;
app.listen(port);
console.log(`application started on port: ${port}`);