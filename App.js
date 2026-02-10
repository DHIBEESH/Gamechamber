const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); // For handling file paths

mongoose.connect('mongodb://localhost:27017/REGISTRATION', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("connection succeeded");
});

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema, 'user');

app.post('/sign_up', function (req, res) {
    var Name = req.body.logname;
    var Email = req.body.logemail;
    var Password = req.body.logpass;

    User.findOne({ email: Email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send('User with this email already exists');
            } else {
                const newUser = new User({
                    "name": Name,
                    "email": Email,
                    "password": Password
                });

                newUser.save()
                    .then(() => {
                        console.log("User registered successfully");
                        return res.redirect('/successfull.html'); // Corrected the redirection
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).send('Error saving user.');
                    });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error during signup.');
        });
});

app.post('/log_in', function (req, res) {
    var Email = req.body.logemail;
    var Password = req.body.logpass;

    User.findOne({ email: Email, password: Password })
        .then(user => {
            if (user) {
                console.log("Login successful");
                return res.redirect('/successfull.html'); // Corrected the redirection
            } else {
                console.log("Invalid email or password");
                return res.status(401).send('Invalid email or password');
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error during login.');
        });
});

app.listen(9000, () => {
    console.log("Server listening at port 9000");
});
