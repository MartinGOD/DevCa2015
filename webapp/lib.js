function getUsersFromFile(){
	//Read Users from File Synchronously
	var fs = require('fs'); //Using Nodejs File Library
	var content = fs.readFileSync("users.json").toString();
	content = JSON.parse(content); //Convert the String to an Object
	return content;
}

module.exports = {
	"getUsersFromFile": getUsersFromFile
}