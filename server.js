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
    .catch(err => {
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const todoItems = await db.collection('todoListFour').find().toArray()
    res.render('index.ejs', {pikachu: todoItems}) 
})

app.post('/addTask', (req, res) => {
    db.collection('todoListFour').insertOne({todoServer: req.body.todoItem, completed: false})
    .then( result => {
        console.log('Todo has been added')
        res.redirect('/')
    })
})

app.put('/markComplete', (req, res) => {
    db.collection('todoListFour').updateOne({todoServer: req.body.anotherPokemon}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log('Tasked Completed')
        res.json('Completed')
    })
})


app.delete('/deleteTask', (req, res) => {
    db.collection('todoListFour').deleteOne({todoServer: req.body.anotherPokemon})
    .then(result => {
        console.log('Deleted Task')
        res.json('Deleted')
    })
})
    

app.listen(3000, () => {
    console.log('Server.js is running.....')
})