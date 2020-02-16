'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const util = require('./../lib/util');
const form = require('./../lib/val');

describe('Credit card type', ()=>{
  it('Should be a valid american express', ()=>{
    assert.equal(util.getCreditCardType('378282246310005'), 'amex')
  })

  it('Should be a valid visa card', ()=>{
    assert.equal(util.getCreditCardType('4111111111111111'), 'visa')
  })
})


describe('Check if it is American Express card', ()=>{
  it('Valid american express number should return true', ()=>{
    let isAmex = util.isAmericanExpressCard('378282246310005')
    assert.equal(isAmex, true)
  })
 
  it('mastercard -- false', ()=>{
    let isAmex = util.isAmericanExpressCard('5555555555554444')
    assert.equal(isAmex, false)
  }) 

  it('visa -- false', ()=>{
    let isAmex = util.isAmericanExpressCard('4012888888881881')
    assert.equal(isAmex, false)
  }) 
})


describe('Redirecting payment gateway', ()=>{
  it('American Express Card should return paypal', ()=>{
    let paymentGateway = util.getPaymentGateway('378282246310005', 'USD')
    assert.equal(paymentGateway, 'paypal')
  }) 

  it('American Express Card should return error', ()=>{
    let errMsg = 'American Express credit card only support USD currency'; 
    let paymentGateway = function(){ util.getPaymentGateway('378282246310005', 'SGD') }
    expect(paymentGateway).to.throw(errMsg)
  }) 

  it('USD currency -- paypal', ()=>{
    let paymentGateway = util.getPaymentGateway('5555555555554444', 'USD')
    assert.equal(paymentGateway, 'paypal')
  }) 

  it('EUR currency -- paypal', ()=>{
    let paymentGateway = util.getPaymentGateway('5555555555554444', 'EUR')
    assert.equal(paymentGateway, 'paypal')
  }) 

  it('AUD currency -- paypal', ()=>{
    let paymentGateway = util.getPaymentGateway('4239530262734958', 'AUD')
    assert.equal(paymentGateway, 'paypal')
  }) 
});
describe('Checking the data from the input', ()=>{
  it('Name is valid', ()=>{
    assert.equal(form.validName('John Doe'), true)  
  })  

  it('Name is invalid', ()=>{
    assert.equal(form.validName('John*^'), false)
  })

  it('Valid credit card CCV', ()=>{
    assert.equal(form.validCvv(614), true)
  })

  it('Invalid credit card CCV', ()=>{
    assert.equal(form.validCvv(30218), false)
  })

  it('Check for valid expiry month', ()=>{
    assert.equal(form.validExpiryMonth('08'), true)
  })
   it('Check for invalid expirty month', ()=>{
    assert.equal(form.validExpiryMonth('26'), false)
  })

  it('Check for valid expiry year', ()=>{
    assert.equal(form.validExpiryYear('2025'), true)
  })

  it('Check for invalid expiry year', ()=>{
    assert.equal(form.validExpiryYear('2034'), false)
  })

  it('Valid credit card should return true', ()=>{
    assert.equal(form.validCreditCard('378282246310005'), true)
  })

  it('Invalid credit card should return false', ()=>{
    assert.equal(form.validCreditCard('378282246310009'), false)
  })
})
