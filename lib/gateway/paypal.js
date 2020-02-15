'use strict';

const config = require('./../../config');
const util   = require('../util');
const paypal = require('paypal-rest-sdk');

module.exports = function(opts){
  paypal.configure({
    'mode': config.sandbox ? 'sandbox' : 'live',
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
                "type": util.getCreditCardType(opts.ccNumber),
                "number": opts.ccNumber,
                "expire_month": opts.expirationMonth,
                "expire_year": opts.expirationYear,
                "cvv2": opts.cvv,
                "first_name": opts.ccName
            }
          }]
        },
        "transactions": [{
          "amount": {
            "total": opts.amount,
            "currency": opts.currency,
          }
        }]
      }; 

      paypal.payment.create(createPaymentJson, done);
    }
  }
}