const mongoose = require ('mongoose');
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imgURL:{
        type: String,
        required: true
    },
    id:{
        type:String,
        required: true
    }
})

const strongholdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    imgURL:{
        type: String,
        required:true
    },
    craftingTime:{
        type:Number,
        required:true
    },
    craftingCost:{
        type:Number,
        required:true
    },

    strongholdXP:{
        type:Number,
        required:true
    },

    strongholdEnergy:{
        type:Number,
        required:true
    },
    id:{
        type:String,
        required: true
    },

        materialOne: {
            type: recipeSchema,
            required: true
        },
        materialTwo: {
            type: recipeSchema,
        },
        materialThree: {
            type: recipeSchema,
        }
        ,
        materialFour: {
            type: recipeSchema,
        }

})

module.exports = mongoose.model('Stronghold', strongholdSchema)