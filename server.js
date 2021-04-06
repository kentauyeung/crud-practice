const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectStr = process.env.DB_STRING,
    dbName = 'todoServer'

MongoClient.connect(dbConnectStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.listen(3000, () => {
    console.log('Server.js is running.....')
})