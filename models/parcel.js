const mongoose = require("mongoose");
var parcelSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    Sender: { type: String, required: true },
    Address: { type: String, default: "Mel" },
    Weight: { type: String, default: "735" },
    // {
    //     type: Number, validate: {
    //         //must a boolean: true/false
    //         validator: function (aWeight) {
    //             return (aWeight > 0 && aWeight <= 1000)
    //         },
    //         message: "Invalid Weight"
    //     }
    // },

});

module.exports = mongoose.model('Parcel', parcelSchema);