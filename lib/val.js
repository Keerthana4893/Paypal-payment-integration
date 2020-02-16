'use strict';

const input = {
  checkValid: function(req, res, next){
    let form = req.body;
    if(!input.validPrice(form.price)){
      return res.status(401).send('Click the check box to transfer the money' + form.price);
    }
    if(!input.validCurrency(form.Currency_type)){
        return res.status(401).send('Choose the currency type' + form.Currency_type);
      }
      if(!input.validCreditCard(form.cc_num)){
        return res.status(401).send('Invalid credit card number ' + form.cc_num);
      }
      next();
    },

    validCurrency: function(currency){
        let currencyArr = ['USD', 'EUR', 'AUD', 'SGD'];
        return (currencyArr.indexOf(currency) > -1)
      },
      validCreditCard: function(ccNo){
        if(/[^0-9-\s]+/.test(ccNo)) return false;
        let nCheck = 0;
        let nDigit = 0;
        let bEven = false;
        ccNo = ccNo.replace(/\D/g, "");
        for (let n = ccNo.length - 1; n >= 0; n--) {
          let cDigit = ccNo.charAt(n);
          let nDigit = parseInt(cDigit, 10);
          if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
          }
          nCheck += nDigit;
          bEven = !bEven;
        }
        return (nCheck % 10) == 0;
      }
    }
    
    module.exports = input;