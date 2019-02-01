const express = require("express");
const router = express.Router();
const Event = require("../../models/Events");
const keys = require("../../config/keys");
const multer = require(`multer`);


var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()+'.jpg')
        }
      })
       
      var upload = multer({ storage: storage })



router.post("/newevent", upload.single('photo'), (req, res, next) => {
        
        let userId = req.body.userId
        let eventform = req.body
      
        let photo = req.file
        eventform.start = {lat: req.body.startLat, lng: req.body.startLng}
        eventform.photo = photo.path
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

router.get("/detail/:id", (req, res)=>{
        Event.find({_id:req.params.id})
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
router.post('/attend/:user/:id', (req,res)=>{
        Event.findByIdAndUpdate(req.params.id,
                {$addToSet: {participant: req.params.user}},
                {safe: true, upsert: true},
                function(err, data) {
                    if(err){
                   
                    } else {
                        
                        res.json({
                        data
                        })
                }
        })
})
router.get('/attending/:userId', (req,res)=>{
	var userId = req.params.userId
	Event.find({ participant: { $elemMatch: { $eq: userId} } }).then(data=>{
		console.log(data)
		if (!data) {
			console.log("nothing")
		} else {
			res.json({
				data
				})
		}
	}).catch(err=>{
		console.log("err")
		console.log(err)
	})
	/*
			function(err, data) {
				if(err){
				console.log(err);
				} else {
				console.log("attending", data);
				res.json({
					data
					})
			}}
			//*/
})

router.post('/edit/:id', (req,res)=>{
        Event.findOneAndUpdate({
                _id: req.params.id
              }, {
                "title": req.body.title,
                "details": req.body.details,
                "city": req.body.city,
                "start": req.body.start,
                "date": req.body.date

              })
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

router.delete("/delete/:id", (req,res)=>{
        Event.findByIdAndDelete({_id:req.params.id})
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
router.get("/local/:lat/:lng", (req, res)=>{
        let lat = req.params.lat
        let lng = req.params.lng
        var latU = parseInt(lat) + 1
        var lngU = parseInt(lng) + 1
        var latL = parseInt(lat)- 1
        var lngL = parseInt(lng) - 1
        Event.find({})
        .exec(function (err, data){
                if (err) {
                        res.json({
                        "error": err
                        })
                } else {
                        var localEvents = data.filter(function (each) {
							
                                return each.start.lat <= latU &&
									each.start.lat >= latL &&
									each.start.lng <= lngU &&
									each.start.lng >= lngL;
							});
							console.log(localEvents);
							res.json(localEvents)
                }
                
        }
        
        )
        
})
module.exports = router;