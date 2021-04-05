const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

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
    res.render('index.ejs')
})

app.post('/', (req, res) => {
    console.log(req.body)
})

