const e = require("express");
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Car = require('./models/car')

let url = 'mongodb://localhost:27017/week6db';
mongoose.connect(url, function (err) {
    if (err === null) {
        console.log("Connect Successfully");

        Car.findByIdAndUpdate('63184077a4242cdb9e57fa16', { year: 1990 }, function (err) {
            if (err) {
                console.log("Error: " + err)
            }
            else {
                console.log("Update Successfully")
            }
        })
        // let car = new Car({ maker: "BMW", model: "X1",year: 2021 });
        // car.save(function (err) {
        //     if (err) {
        //         console.log("Save Unsuccess" + err)
        //     }
        //     else {
        //         console.log("Save Success")
        //     }
        // });

    }
});


