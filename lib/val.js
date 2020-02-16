'use strict';

const input = {
  checkValid: function(req, res, next){
    let form = req.body;
    if(!input.validPrice(form.price)){
      return res.status(401).send('Click the check box to choose the amount' + form.price);
      }
    if(!input.validCurrency(form.Currency_type)){
        return res.status(401).send('Choose the currency type' + form.Currency_type);
      }
    
    if(!input.validName(form.cc_name)){
      return res.status(401).send('Invalid card holder name ' + form.cc_name);
      }
    if(!input.validCreditCard(form.cc_num)){
        return res.status(401).send('Invalid credit card number ' + form.cc_num);
      }
    if(!input.validCvv(form.cvv)){
      return res.status(401).send('Invalid CVV ' + form.cvv);
    }
    if(!input.validExpiryMonth(form.cc_expiry_month))
    {
      return res.status(401).send('Invalid credit expiry month ' + form.cc_expiry_month);
    }
    if(!input.validExpiryYear(form.cc_expiry_year))
    {
      return res.status(401).send('Invalid credit expiry year ' + form.cc_expiry_year);
    }
      next();
    },
  
  validName: function(name){
    return /^[a-zA-Z\s\.]+$/.test(name)
  },
  
  
  validCurrency: function(currency){
        let currencyArr = ['USD', 'EUR', 'AUD', 'SGD'];
        return (currencyArr.indexOf(currency) > -1)
      },
  
  validCvv: function(cvv){
    return /^[0-9]{3,4}$/.test(cvv)  
  },

  validExpiryMonth: function(MM){
    return /^[01]{1}[0-9]{1}$/.test(MM)
  },

  validExpiryYear: function(YYYY){
    let yyyyArr = ['2016', '2017', '2018', '2019', '2020'];
    return (yyyyArr.indexOf(YYYY) > - 1) 
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
