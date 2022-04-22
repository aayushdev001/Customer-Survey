const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/feedbackdb");

const feedbackSchema = mongoose.Schema({
    username: String,
    question1: Number,
    question2: Number,
    question3: Number,
    question4: Number,
    question5: String,
    flag: String
})
const feedbackmodel = mongoose.model("Feedbackcollection", feedbackSchema)


app.get("/", (req, res) => {

    res.sendFile(__dirname + '/questions/Home.html');
})
app.get("/question1", (req, res) => {
    res.sendFile(__dirname + '/questions/question1.html');
})
app.get("/question2", (req, res) => {
    res.sendFile(__dirname + '/questions/question2.html');
})
app.get("/question3", (req, res) => {
    res.sendFile(__dirname + '/questions/question3.html');
})
app.get("/question4", (req, res) => {
    res.sendFile(__dirname + '/questions/question4.html');
})
app.get("/question5", (req, res) => {
    res.sendFile(__dirname + '/questions/question5.html');
})
app.get("/confirmation", (req, res) => {
    res.sendFile(__dirname + '/questions/confirmation.html');
})

let username;

app.post("/", (req, res) => {
    console.log(req.body.username);
    username = req.body.username
    const feedback = new feedbackmodel({
        username: username,
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: "",
        flag: ""
    })
    feedback.save();
    res.redirect("/question1");
})
app.post("/question1", (req, res) => {
    console.log(req.body.radio);
    console.log(username);
    if(req.body.btn === "next")
    {
        feedbackmodel.updateOne({ username: username }, { question1: req.body.radio }, (err) => {
            if (err) {
                console.log(err);
            }
            else
            {
                console.log("succesfully updated")
            }
        })
        res.redirect("/question2")
    }
    else
    {
        res.redirect("/");
    }
})
app.post("/question2", (req, res) => {
    console.log(req.body.btn)
    if(req.body.btn === "next")
    {
        console.log(req.body.radio);
        feedbackmodel.updateOne({ username: username }, { question2: req.body.radio }, (err) => {
            if (err) {
                console.log(err);
            }
            else
            {
                console.log("succesfully updated")
            }
        })
        res.redirect("/question3")
    }
    else
    {
        res.redirect("/question1")
    }
})
app.post("/question3", (req, res) => {
    console.log(req.body.radio);
    if(req.body.btn === "next")
    {
        feedbackmodel.updateOne({ username: username }, { question3: req.body.radio }, (err) => {
            if (err) {
                console.log(err);
            }
            else
            {
                console.log("succesfully updated")
            }
        })
        res.redirect("/question4")
    }
    else
    {
        res.redirect("/question2")
    }
})
app.post("/question4", (req, res) => {
    console.log(req.body.radio);
    if(req.body.btn === "next")
    {
        feedbackmodel.updateOne({ username: username }, { question4: req.body.radio }, (err) => {
            if (err) {
                console.log(err);
            }
            else
            {
                console.log("succesfully updated")
            }
        })
        res.redirect("/question5")
    }
    else
    {
        res.redirect("/question3")
    }
})
app.post("/question5", (req, res) => {
    console.log(req.body.radio);
    if(req.body.btn === "next")
    {        
        feedbackmodel.updateOne({ username: username }, { question5: req.body.answer }, (err) => {
            if (err) {
                console.log(err);
            }
            else
            {
                console.log("succesfully updated")
            }
        })
        res.redirect("/confirmation")
    }
    else
    {
        res.redirect("/question4")
    }
})
app.post('/confirmation', (req, res) => {
    feedbackmodel.updateOne({ username: username }, { flag: "COMPLETED" }, (err) => {
        if (err) {
            console.log(err);
        }
        else
        {
            console.log("succesfully updated")
        }
    })
    // setTimeout(res.redirect("/"), 5000)
    setTimeout(function(){
        res.redirect("/");
    }, 5000);
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})