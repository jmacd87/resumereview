const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const upload = require('./upload')
const app = express()
const port = process.env.PORT || 5000

require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI || 5000
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB connection established")
})

const recipesRouter = require('./routes/recipes')
const usersRouter = require('./routes/users')

app.use('/recipes', recipesRouter)
app.use('/users', usersRouter)
app.post('/upload', upload)

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})