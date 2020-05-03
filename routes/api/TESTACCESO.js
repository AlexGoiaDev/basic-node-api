const express = require('express');
var router = express.Router();
var pgp = require("pg-promise")();
var db = pgp("postgres://postgres:mysecretpassword@192.168.0.12:5432/postgres");
//this shit is only to can read de body content
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router
.get('/', function(req, res, next) {
    db.any("select * from public.account",).then(data=>{  
        if(data){
          data.forEach(element => {
          console.log(element.username) 
        }); 
    }}
    ).catch(error=>console.log(error))
    .finally(res.send('ok'));
});

router.post('/', function(req,res,next){
    console.log(req);
    db.one("insert into public.account(user_id,username) values($1,$2)",[req.body.userid,req.body.username])
    .then(data=>console.log(data)).catch(error=>console.log(error)).finally();
    res.send();
});

  
module.exports = router;
  