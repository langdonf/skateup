const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    title: String, 
    city: String,
    date: {
        type: Date,
    },
    details: String,
    photo: String,
    start: {
        lat: Number,
        lng: Number,
    }

})

module.exports = Event = mongoose.model("Event", EventSchema);