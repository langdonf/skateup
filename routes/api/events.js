const express = require("express");
const router = express.Router();
const Event = require("../../models/Events");
const keys = require("../../config/keys");

router.post("/newevent", (req, res) => {
        console.log(req.body);
        let userId = req.body.userId
        let eventform = req.body.newEvent

        eventform.owner = userId
        
        const newEvent = new Event(eventform)
        .save()
        .then(event => res.json(event))
    
        })

router.get("/all", (req, res) => {
        
}
module.exports = router;