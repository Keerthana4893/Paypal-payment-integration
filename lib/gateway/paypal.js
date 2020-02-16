'use strict';

const config = require('./../../config');
const util   = require('../util');
const paypal = require('paypal-rest-sdk');

module.exports = function(option){
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.paypal.clientId,
    'client_secret': config.paypal.clientSecret
  })

  return {
    send: function(done){
      let createPaymentJson = {
        "intent": "sale",
        "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
            "credit_card": {
                "type": util.getCreditCardType(option.ccNumber),
                "number": option.ccNumber,
                "expiration": option.expiration,
                "cvv2": option.cvv,
                "first_name": option.ccName
            }
          }]
        },
        "transactions": [{
          "amount": {
            "total": option.amount,
            "currency": option.currency,
          }
        }]
      }; 

      paypal.payment.create(createPaymentJson, done);
    }
  }
}
