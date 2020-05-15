const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('backend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'backend', 'build', 'index.html'))
    })
}
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB connection established")
})

const recipesRouter = require('./routes/recipes')
const usersRouter = require('./routes/users')

app.use('/recipes', recipesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})