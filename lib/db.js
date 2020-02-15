  
'use strict';

const config = require('./../config');
const mongodb = require('mongodb').MongoClient;
const assert = require('assert');
const objectId = require('mongodb').ObjectID;

module.exports = {
  save: function(data, done){
    mongodb.connect(config.db, (error,db)=>{
      assert.equal(null, error);
      db.collection('transactions').insertOne(data, (err, res)=>{
        done(err, res);
        db.close();
      });
    })
  },
  
  findById: function(id, done){
    mongodb.connect(config.db, (error, db)=>{
      assert.equal(null, error);
      db.collection('transactions').findOne({_id: objectId(id)}, (err, res)=>{
        done(err, res);
        db.close();
      });
    })
  }
}