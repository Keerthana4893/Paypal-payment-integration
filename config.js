'use strict';
const config = {
  development: {
    port: 4023,
    db: 'mongodb://localhost:27017/test',
    sandbox: true,
    paypal: {
         clientId : 'AdzrBV2zdHzKLZ_NqKD7hXyB5J-KKPnyJi5VGSY0EBFh9F7n9quqws34xm9HhYD3c8-an-O4VWy60WaM',
        clientSecret : 'EORxx0b6wSBb1f7e8JXwqhx0nCmjpZYHeHxIk-iimzkdlMLCakEGyUipK85rrrHFUxsXLVKPG3dMPS7Z' 
    }
  },
  production: {
    port: process.env.PORT,
    db: process.env.MONGODB_URL,
    sandbox: false,
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_SECRET,
    }
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
