'use strict';
const util = require('./util');
const payment = function(option){
  var paymentObject; 
  var paymentGateway = util.getPaymentGateway(option.cc_number, option.Currency_type);

  switch(paymentGateway){
    case 'paypal':
      paymentObject = require('./gateway/paypal')(option);
      break;
   
      default: 
      break;
  } 

  return paymentObject;
}

module.exports = payment;
