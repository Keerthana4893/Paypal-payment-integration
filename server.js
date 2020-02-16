'use strict';

const config = require('./config');
const form = require('./lib/val');
const payment = require('./lib/payment');
const db  = require('./lib/db');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/pay', form.checkValid);
app.post('/pay', (req, res) => {
  let option = {
      ccName: req.body.cc_name,
      ccNumber: req.body.cc_number,
      expirationMonth: req.body.cc_expiry_month,
      expirationYear: req.body.cc_expiry_year,
      cvv: req.body.cc_cvv,
      currency: req.body.currency,
      amount: req.body.price
  }
  
  try{
    var pay = payment(option);
  }catch(e){
    return res.status(401).send(e);
  }


  pay.send((err, result)=>{
      let paymentStatus = err ? 'Failed' : 'Success';
      let data = {
        price: req.body.price,
        currency: req.body.Currency_type,
        fullName: req.body.full_name,
        status: paymentStatus,
        response: err || result
      };
      

      db.save(data, (error, info)=>{
        res.send('Payment ' + paymentStatus + '. <a href="/status/' + info.insertedId + '"> View details </a>');
      })
  })    
})

app.get('/status/:id', (req, res)=>{
  db.findById(req.params.id, (err, data)=>{
    res.send(data);
  })
})

app.listen(config.port, () => {
  console.log('Server  started at port ', config.port)
})
