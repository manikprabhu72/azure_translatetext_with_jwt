var request = require('request');
var uuidv4 = require('uuid/v4');
var express = require("express");
var jwt = require('jsonwebtoken');
var router = express.Router();
var subscriptionKey = '8867a61d1ca742828348bc9719b0e4d5';
var endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

const translateImpl = function(req, res){
  let body = req.body;
  if('translateTo' in body && 'text' in body){
    let options = {
      method: 'POST',
      baseUrl: endpoint,
      url: 'translate',
      qs: {
        'api-version': '3.0',
        'to': body.translateTo
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      body: [{
            'text': body.text
      }],
      json: true,
    };
    request(options, function(err, response, body){
      if(err) return res.sendStatus(500);      
      return res.status(200).json(body);
    });
  }else{
    return res.json({msg: 'Invalid Request'});
  }
};

const verifyJwtToken = (req,res,next) => {
  let header = req.headers['authorization'];
  let token = header && header.split(' ')[1];
  console.log(token);
  if(token == null) return res.sendStatus(401);
  jwt.verify(token,'mySecretKey',function(err,user){
    if(err) return res.sendStatus(403);
    next();
  })
};

router.post("/translate",translateImpl);

router.post('/user/translate',verifyJwtToken, translateImpl);

router.post('/user/login', function(req,res) {
  //Authenticate User
  let username = req.body.username;
  let password = req.body.password;
  if(username && password && username == 'Manik' && password=='jwt'){
    let user = { name: username };
    let accessToken = jwt.sign(user, 'mySecretKey', {expiresIn: '0.2h'});
    res.json({accessToken: accessToken});
  }else{
    res.json({msg:"Invalid Login"});
  }
});



module.exports = router;