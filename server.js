const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const TodoTask = require('./models/TodoTask')

dotenv.config()

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true }))

mongoose.startSession('useFindAndModify', false)

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to DB...')

    app.listen(3000, () => console.log('Server running...'))
})

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

