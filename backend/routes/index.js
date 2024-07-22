var express = require('express');
var router = express.Router();

require('dotenv').config()
console.log(process.env.MONGO_URI)

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassManager';
client.connect()
/* GET home page. */
router.get('/', async function(req, res, next) {
  const db=client.db(dbName)
  const collection=db.collection('documents');
  const findResult=await collection.find({}).toArray()
  res.json(findResult)
});

router.post('/', async function(req, res, next) {
  const password=req.body
  const db=client.db(dbName)
  const collection=db.collection('documents');
  const findResult=await collection.insertOne(password)
  res.send(req.body)
});


module.exports = router;
