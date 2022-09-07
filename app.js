const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Parcel = require('./models/parcel')

app.set("view engine", "html");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.listen(8080);


let url = 'mongodb://localhost:27017/week6lab';
let db;
mongoose.connect(url, function (err) {
    if (err === null) {
        console.log("Connect Successfully");

        // Parcel.findByIdAndUpdate('63184077a4242cdb9e57fa16', { year: 1990 }, function (err) {
        //     if (err) {
        //         console.log("Error: " + err)
        //     }
        //     else {
        //         console.log("Update Successfully")
        //     }
        // })
    }
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/adduser', function (req, res) {
    res.sendFile(__dirname + "/views/adduser.html");
})

app.post('/addnewuser', function (req, res) {
    let userDetails = req.body;
    let parcel = new Parcel({
        Sender: userDetails.uname,
        Address: userDetails.uaddress,
        Weight: userDetails.uage,
    });
    parcel.save(function (err) {
        if (err) {
            console.log("Save Unsuccess" + err)
        }
        else {
            console.log("Save Success")
        }
    });
})

app.get('/deleteuser', function (req, res) {
    res.sendFile(__dirname + "/views/deleteuser.html");
})

app.post('/deleteuserdata', function (req, res) {
    let id = req.body.id;
    Parcel.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("Save Unsuccess" + err)
        }
        else {
            console.log("Save Success")
        }
    });
})

app.get("/updateuser", function (req, res) {
    res.sendFile(__dirname + "/views/updateuser.html");
});

app.post("/updateuserdata", function (req, res) {
    let userDetails = req.body;
    let id = req.body.id;
    let theUpdate;
    theUpdate = {
        $set: {
            Sender: userDetails.unamenew,
            Weight: userDetails.uagenew,
            Address: userDetails.uaddressnew,
            Fg: "True"
        },
    };
    Parcel.findByIdAndUpdate(id, theUpdate, function (err) {
    });
});

// app.get("/getusers", function (req, res) {
//     const filter = {};
//     let info;
//     Parcel.find({}, function (err, data) {
//         // info = data.toArray;
//         res.render("listusers", { usersDb: data });
//         console.log(data)
//         // docs is an array
//     });
// });

app.get("/getusers", function (req, res) {
    Parcel.find({}, function (err, data) {
        if (err) {
            res.render("listusers.html");
        }
        res.render("listusers.html", {
            usersDb: data
        });
    });
});

// app.get('/getusers', function (req, res) {
//     Parcel.find({}, function (err, d) {
//         // res.render("listusers.html", { usersDb: d });
//     });
// });

app.get('/findname', function (req, res) {
    res.sendFile(__dirname + "/views/findname.html");
})

app.post("/findname", function (req, res) {
    let userDetails = req.body;
    let name = userDetails.unamenew;
    Parcel.find({ Sender: name }, function (err, docs) {
        console.log(docs);
        // res.render("listname.html", { usersDb: docs });
    });
    res.sendFile(__dirname + "/views/findname.html");
});

app.get('/findweight', function (req, res) {
    res.sendFile(__dirname + "/views/findweight.html");
})

app.post("/findweight", function (req, res) {
    let userDetails = req.body;
    let no1 = userDetails.weight1;
    let no2 = userDetails.weight2;
    Parcel.where(Parcel.Weight).gte(no1).lte(no2).exec(function (err, docs) {
        console.log(docs);
        // res.render("listweight.html", { usersDb: docs });
    });
    res.sendFile(__dirname + "/views/findweight.html");
});