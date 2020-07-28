const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    resumeImg: {
        type: String
    }
}, {
    collection: 'resume'
})

module.exports = mongoose.model('Resume', resumeSchema)