const express = require("express");
const router = express.Router();
const Event = require("../../models/Events");
const keys = require("../../config/keys");
const multer = require(`multer`);
var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      })
var upload = multer({ storage: storage })



router.post("/newevent", upload.single('photo'), (req, res, next) => {
        // console.log(req.body);
        let userId = req.body.userId
        let eventform = req.body.newEvent
        console.log("req.file:", req.file);
        let photo = req.file
        eventform.photo = photo
        eventform.owner = userId
        
        const newEvent = new Event(eventform)
        .save()
        .then(event => res.json(event))
    
        })
router.get("/user/:id", (req, res)=>{
        Event.find({owner:req.params.id})
        .exec(function (err, data) {
                if (err) {
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

router.get("/all", (req, res) => {
        Event.find({})
        .then(event => res.json(event))
        
})
module.exports = router;