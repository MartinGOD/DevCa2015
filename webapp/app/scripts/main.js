(function(window){
	"use strict";
	console.log('\'Allo \'Allo!');

	function populateTable(users, tableid, tablebodyid){
		var tbId = tablebodyid || "dataBody",
			tId = tableid || "mainTbl",
			$tBody = $("#" + tbId),
			$tbl = $("#" + tId);

		users.forEach(function(el){
			var rec = transformRec(el);
			$tBody.append(generateRowHTML(rec));
		});

		
		// This is a javascript library for sorting tables
		$tbl.dataTable(); 
	}

	function transformRec(rec){
		var nRec = {};
		nRec.title 	= rec.user.name.title;
		nRec.first 	= rec.user.name.first;
		nRec.last 	= rec.user.name.last;
		nRec.gender = rec.user.gender;
		nRec.street	= rec.user.location.street;
		nRec.city	= rec.user.location.city;
		nRec.state	= rec.user.location.state;
		nRec.email	= rec.user.email;
		nRec.username=rec.user.username;
		nRec.dob 	= rec.user.dob;
		nRec.image	= rec.user.picture.thumbnail;
		return nRec;
	}



	function generateRowHTML(rec){
		var str = "<tr>";
		str += "<td><img src='" + rec.image +"' alt='profile image' /></td>"
		// str += "<td>" + rec.title +"</td>";
		// str += "<td>"+rec.first +"</td>";
		// str += "<td>"+rec.last +"</td>";
		str += "<td>"+rec.first+" "+rec.last+"</td>"
		// str += "<td>"+rec.street +"</td>";
		str += "<td>"+rec.city +"</td>";
		str += "<td>"+rec.state +"</td>";
		str += "<td>"+rec.email +"</td>";
		str += "<td>"+rec.username +"</td>";
		str += "<td>"+rec.dob+"</td>";
		str += "</tr>";
		return str;
	}

	function removeTable(tablebodyid){
		var tbId = tablebodyid || "dataBody",
			$tBody = $("#" + tbId);

		$tBody.empty();
	}


	function loadAllRecs(callback){
		$.get("/api/users", function(data){
			console.log(data.length);
			callback(data);
		});
	}

	function loadRecsByCity(city, callback){
		var ajaxOptions = {};//Create an object to pass configuration parameters

		ajaxOptions.url = "/api/users/city/" + city;

		ajaxOptions.success = function(data){
			callback(data); //Run the callback if data is successfully received
		}

		ajaxOptions.error = function(jqXHR, textStatus, error){
			console.log("Error Occurred");
			console.log(textStatus);
			console.log(error);
			callback([]); //pass empty array as result
		}

		ajaxOptions.type = "GET";

		//Perform the actual AJAX request
		$.ajax(ajaxOptions);
	}

	function loadRecsByGender(gender, callback){
		var ajaxOptions = {};
		
		ajaxOptions.url ="/api/users/gender/" + gender;

		ajaxOptions.success = function(data) {
			callback(data);
		}

		ajaxOptions.error = function(jqXHR, textStatus, error){
			console.log("Error Occurred");
			console.log(textStatus);
			console.log(error);
			callback([]); //pass empty array as result
		}
		ajaxOptions.type = "GET";
		//Perform the actual AJAX request
		$.ajax(ajaxOptions);
	}
	function loadRecsByUsername(username,callback){
		var ajaxOptions={};

		ajaxOptions.url="/api/users/" +username;

		ajaxOptions.success=function(data){
			callback(data);
		}

		ajaxOptions.error= function(jqXHR, textStatus, error){
			console.log("Error Occurred");
			console.log(textStatus);
			console.log(error);
			callback([]); //pass empty array as result
		}

		ajaxOptions.type="GET";
		$.ajax(ajaxOptions);
	}

	function drawPieChartByGender(users){
		var chartid = "chartSec";

		// This allows you to make a count regardless of the types of gender within the data
		var count = {};
		//Extract the values
		users.forEach(function(el){
			if (count[el.gender] === undefined){
				count[el.gender] = 0;
			}

			count[el.gender] += 1;
		});


		// Format the data in the way the library expects
		var recs = [];
		for (var gender in count){
			recs.push([ gender, count[gender]]);
		}


		$("#"+chartid).highcharts({
			title:{
				text: "Gender distribution"
			},
			series:[{
				type: 'pie',
				name: 'gender',
				data: recs
			}]
		})
	}

	function drawPieChartByState(users){
		var chartid = "chartSec";

		// This allows you to make a count regardless of the types of gender within the data
		var count = {};
		//Extract the values
		users.forEach(function(el){
			if (count[el.state] === undefined){
				count[el.state] = 0;
			}

			count[el.state] += 1;
		});


		// Format the data in the way the library expects
		var recs = [];
		for (var state in count){
			recs.push([ state, count[state]]);
		}


		$("#"+chartid).highcharts({
			title:{
				text: "State distribution"
			},
			series:[{
				type: 'pie',
				name: 'state',
				data: recs
			}]
		})
	}
	function drawColumnChartByState(users){
		var chartid = "chartSec2";
		var count = {};
		//Extract the values
		users.forEach(function(el){
			if (count[el.state] === undefined)count[el.state] = 0;
			count[el.state] += 1;
		});
	

		var data = [];

		for (var state in count){
			var dObj = {};
			dObj.name = state;
			dObj.data = [count[state]];

			data.push(dObj);
		}

		$("#"+chartid).highcharts({
			chart:{
				type:'column'
			},
			title:{
				text: "State distribution"
			},
			xAxis: {
                categories: [
                    "States"
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Occurances'
                }
            },
			series: data
		})
	}

	function drawColumnChartByCity(users){
		var chartid = "chartSec";
		var count = {};
		//Extract the values
		users.forEach(function(el){
			if (count[el.city] === undefined)count[el.city] = 0;
			count[el.city] += 1;
		});
	

		var data = [];

		for (var city in count){
			var dObj = {};
			dObj.name = city;
			dObj.data = [count[city]];

			data.push(dObj);
		}

		$("#"+chartid).highcharts({
			chart:{
				type:'column'
			},
			title:{
				text: "City distribution"
			},
			xAxis: {
                categories: [
                    "Cities"
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Occurances'
                }
            },
			series: data
		})
	}

	function defineTableButtons(){
		//configure buttons by assigning functionality programatically
		$("#btnAll").click(function(){
			console.log("All Button Clicked");
			loadAllRecs( function(data){
				removeTable(); // Remove records before adding new records
				populateTable(data);
			});
		});
		$("#btnCity").click(function(){
			console.log("City Button Clicked");
			var city = prompt("Enter City");

			loadRecsByCity(city, function(data){
				removeTable(); // Remove records before adding new records
				populateTable(data);
			});
		});
		$("#btnGen").click(function(){
			console.log("Gender Button Clicked");
			var gender = prompt("Enter Gender");
			loadRecsByGender(gender, function(data){
				removeTable();
				populateTable(data);
			});
		});
		$("#btnUnam").click(function(){
			console.log("Username Button Clicked");
			var username=prompt("Enter username");
			loadRecsByUsername(username,function(data){
				removeTable();
				if(typeof(data)==='object'){
					populateTable([data]);
				}
			})
		});
	}

	function defineChartButtons(){
		
		$("#btnChartState").click(function(){
			console.log("State Button Clicked");
			
			loadAllRecs(function(data){
				var recs = data.map(transformRec)
				drawPieChartByState(recs);
				drawColumnChartByState(recs);
			});
			//Implement State
		});
		$("#btnChartGender").click(function(){
			console.log("Gender Button Clicked");
			$("#chartSec2").empty();
			loadAllRecs(function(data){
				var recs = data.map(transformRec)
				drawPieChartByGender(recs);
			});
		});
		$("#btnChartCity").click(function(){
			$("#chartSec2").empty();
			console.log("City Button Clicked");
			loadAllRecs(function(data){
			var recs = data.map(transformRec)
			drawColumnChartByCity(recs);
		});
		});
	}

	$(document).ready(function(){
		defineTableButtons();
		defineChartButtons();

		loadAllRecs( function(data){
			populateTable(data);
		});

		loadAllRecs(function(data){
			var recs = data.map(transformRec)
			drawColumnChartByCity(recs);
		});
});

}(this));
	