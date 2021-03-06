const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../Validation/register");
const validateLoginInput = require("../../Validation/login");
// Load User model
const User = require("../../models/User");
const getIdFromToken = require("../../config/passport")
const multer = require(`multer`);

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
        }
    // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
            id: user.id,
            username: user.username
            };     
    // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                res.json({
                    success: true,
                    token: token,
                    userData: payload
                });
                }
            );
        } else {
            return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
        });
    });
})

router.put('/edit/:id',(req, res)=>{
    User.findByIdAndUpdate({
        _id: req.params.id
    },req.body, {new: true})
        .exec(function (err, data){
            if (err){
                res.json({
                    "error": err
                })
            } else {
                console.log(data);
                res.json({
                    data
                })
            }
    })
})

router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
        if (!isValid) {
        return res.status(400).json(errors);
        }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } 
    const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            hometown: req.body.hometown,
            boards: req.body.boards,
            });
    // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });
    })
})

router.get('/:id', function (req, res) {
    User.findOne({
        _id: req.params.id
    }, function (err, userData) {
        if (err) {
            res.json({
                "message": "invalid query",
                "status": false
            })
        } else {
            res.json({
                "data": {
                    "username": userData.username,
                    "hometown": userData.hometown,
                    "joinDate": userData.date,
                    "boards" : userData.boards
                },
                "status": true
            })
        }
    });
})

module.exports = router;