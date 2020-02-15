'use strict';

const util  = {
  isAmericanExpressCard: function(creditCardNo){
    return (util.getCreditCardType(creditCardNo) === 'amex')
  },

  getCreditCardType: function(creditCardNo){
    let amex = /^3[47]{1}[0-9]{5,}$/;
    let visa = /^4[0-9]{6,}$/;
    if(amex.test(creditCardNo)) return 'amex';
    if(visa.test(creditCardNo)) return 'visa';
    throw 'Credit card not supported';
  },

  getPaymentGateway: function(creditCardNumber, currency){
    if(util.isAmericanExpressCard(creditCardNumber)){
      if(currency === 'USD') return 'paypal'; 
      throw 'American Express credit card only support USD currency'; 
    }
  
    if((currency === 'EUR')||(currency === 'AUD'))
    {
     return 'paypal'; 
    }
  }
}

module.exports = util