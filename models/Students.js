const {Schema, model } = require('mongoose')

const schema = new Schema({
    id: {type: Number, required: true, unique: true},
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true,},
    age: {type: Number, required: true,},
    nationality: {type: String, required: true,},
})

module.exports = model('students', schema)