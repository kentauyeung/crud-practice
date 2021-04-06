const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let dbConnectionString = process.env.DB_STRING

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true})

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render('index.ejs', { todoTasks: tasks })
    })
})

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    })
    try {
        await todoTask.save()
        res.redirect('/')
    } catch (err) {
        req.redirect('/')
    }
})

app.listen(3000, () => {
    console.log('Server running....')
})