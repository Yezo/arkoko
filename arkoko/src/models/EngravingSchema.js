const mongoose = require ('mongoose');
const Schema = mongoose.Schema


const engravingSchema = new Schema({
    engraving: {
        type: String,
        required: true
    },
    imageURL:{
        type: String,
        required: true
    },
    levelOne:{
        type: String,
        required: true
    },
    levelTwo:{
        type: String,
        required: true
    },
    levelThree:{
        type: String,
        required: true
    },
    isClassEngraving:{
        type: Boolean,
        required: true
    },
    belongsToClass:{
        type: String
    }

})

module.exports = mongoose.model('Engraving', engravingSchema)