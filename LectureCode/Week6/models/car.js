const mongoose = require("mongoose");
var carSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    maker: { type: String, required: true },
    model: { type: String, default: "735" },
    year: {
        type: Number, validate: {
            //must a boolean: true/false
            validator: function (aYear) {
                return (aYear >= 1990 && aYear <= 2023)
            },
            message: "Invalid Year"
        }
    },
});

module.exports = mongoose.model('Car', carSchema);