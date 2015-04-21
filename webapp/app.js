
var express = require('express'), 	// Import the required library
	bodyParser = require('body-parser'),
	app = express(),				// Initialize new instance of an application

	port = 3000;					// Specify the port of our application


KedLib = require("./lib");
var users = KedLib.getUsersFromFile();


function findUserByUserName(users, username, callback){
	var el, i;
	for(i = 0; i < users.length; i+=1){
		el = users[i];
		if (el.user.username === username){
			callback(el, i); //pass the index as the second location (incase it is needed)
			return; //Stop immediately as we assume that the username is unique
		}
	}
	callback(null); //send null to the callback function if username not found
}

function findUserByGender(users, gender, callback){
	var filtered = users.filter(function(el){
		return el.user.gender === gender; //Returns true if the gender of the element is the same as the one passed in as a parameter
	});

	callback(filtered); //send the array of the results to the callback function
}

// Q3
function findUserByCity(users, city, callback){
	console.log(users[0].user.location.city);
	// Part A)
	var filtered = users.filter(function(el){
		return el.user.location.city === city;
	});

	callback(filtered);
}

//Configure Express
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Q1 
//We can create the endppoints of out API
app.get("/api/users", function(req, res){
	console.log("Request for users");
	res.json(users);
	//Enter command to send data to client
});

app.get("/api/users/:username", function(req, res){
	var username = req.param("username");
	console.log(username);
	// We use our implemented function to find the username
	findUserByUserName(users, username, function(record){ //Note the use of the anonymous function as the parameter for the callback
		if (record != null){  	// if record found
			res.json(record); 	// send as json
		}else{ 					// if record not found send the http 404 status which is the standard code in the protocol for not found
			res.status(404).send("record with username not found");
		}
	}); 
});

// Q2
app.get("/api/users/gender/:gender", function(req, res){
	var gender = req.param("gender");
	//Enter the Code the get the gender parameter specified by the client
	findUserByGender(users, gender, function(results){
		if(results != null){
			res.json(results);
		}
		else{
			res.status(404).send("record with gender not found");
		}
	})
	console.log(gender);
	//Enter the code to filter the results to send to the user only the gender specified
});

// Q3
app.get("/api/users/city/:city", function(req, res){
	var city = req.param("city");
	findUserByCity(users, city, function(results){
		if(results != null){
			res.json(results);
		}
		else{
			res.status(404).send("record with city not found");
		}
	})
	console.log(city);

	// Party B) Use the findUserByCity function you created in the previous part of this question
})

// Q4
app.delete("api/users/:username", function(req,res)
	var username = req.param("username");
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	findUserByUserName(users, username, function(record, index){
		users.splice(index,1);
	})
});

app.listen(port);
console.log("Application Stated on port: " + port);
