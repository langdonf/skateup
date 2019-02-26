# SkateUp

![peoplehavingfun.jpeg](https://blog.boostedboards.com/wp-content/uploads/2018/06/boosted-boards-san-francisco-group-ride.jpg)

SkateUp is a longboarding meet-up site that allows users to host e-skate group rides in their area. Users can create customized profiles, view local events and get information on upcoming meet-ups. 

## Motivation

There is a big group ride scene especially with the e-skate community.  I was always seeing posts on reddit or local forums about upcoming group rides, so I thought it would be fun to build an app designed for that purpose. 

## Usage

[www.skateup.herokuapp.com](https://skateup.herokuapp.com)

Create an account to host events. It's free, and I won't send you spam because I have no reason to do that. 

## Features

* JWT Auth
* Create and edit profile 
* Create, edit and delete events
* Browse local events
* RSVP to events
* Google Maps API 
   * Geolocation for lat, lng, and formatted address of most likely location.
   * Inline google maps of event start location
* Front-end and back-end form validation


## Technologies and Frameworks

* JavaScript
* HTML
* CSS
* Mongoose
* MongoDB
* React
* React Router
* Node.js
* Express
* MLab
* Material UI
* JWT
* BCyrpt
* Multer
* Google Maps API
* Moment.js
* Heroku
* Github


## Challenges
- Material UI - I had a pretty hard time fighting Material UI a lot of the time.  The documentation was sparse, and only had example for 30% of the functionality, and when there were examples they were needlessly over complicated, mixing features and adding functionality unrelated to the component being described. The modal example... [for example](https://material-ui.com/utils/modal/).  I feel like it ended up making things more difficult overall and would probably stick to something more flexible next time. 

<img src="https://i.imgur.com/eIMwpNk.png" width="360">

- Maybe this sort of thing could have been avoided but this is one example of a single input div and the necessary parents Material UI creates each with different classes, attributes and properties. 



## Code I'm happy with

I was pleased with how the integration of the google maps API worked out.  It was very helpful from a backend point of view as well as for the user, to take the guess work out of hometown location and finding local events.

So when the user goes to their homepage I make an API call with their hometown to grab the latitude and longitude, set an upper and lower bounds of about twenty miles, then filter my events in the database with the lat and lng in that range to return local events. It was a fun problem to solve and turned out pretty clean. 

```javascript
router.get("/local/:lat/:lng", (req, res)=>{
	let lat = req.params.lat
	let lng = req.params.lng
	var latU = parseInt(lat) + 1
	var lngU = parseInt(lng) + 1
	var latL = parseInt(lat) - 1
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
				res.json(localEvents)
			}
		}
	)
})
```
## Code I'm not happy with

[This monster of a details page](https://github.com/langdonf/skateup/blob/master/client/src/containers/Detail.js)
## Things to work on
- Organization - The file structure could be cleaned up and organized, as well as the code itself. 

- Dryness- there are definitely some optimizations that could be done.  There are a few places where thing are repeated.

- I plan on spending the next few weeks cleaning up the code, and refactoring into more organized components.  Its a little buggy, and needs better error handling. 


## Resources and Assistance
 - Stack Overflow
 - NPM's
 - Dalton 
 - Isha

Special thanks to classmates
 - Ujwal
 - Clarence 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
