const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const uri = process.env.ATLAS_URI || 5000
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.once('open', () => {
    console.log("MongoDB connection established")
})

const recipesRouter = require('./routes/recipes')
const usersRouter = require('./routes/users')
const uploadRouter = require('./routes/uploads')


app.use('/recipes', recipesRouter)
app.use('/users', usersRouter)
app.use('/uploads', uploadRouter)
//file upload code
app.use(fileUpload());

// Upload Endpoint
// app.post('/upload', (req, res) => {
//     if (req.files === null) {
//         return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const file = req.files.file;

//     file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }

//         res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//     });
// });

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