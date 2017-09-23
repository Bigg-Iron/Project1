console.log("JavaScript is loaded")

var map;
var geocoder;

$(document).ready(function(){

var petType = ["dog", "cat"];
var pets = "";
renderButtons();

// this creates the buttons
function renderButtons() {
	$("#buttonDiv").empty();
	for (var i = 0; i < petType.length; i++) {
		var b = $("<button>");
			b.addClass("petTypeButton btn btn-primary");
			b.css("margin", "10px");
			b.attr("data-name", petType[i]);
			b.text(petType[i]);
			$("#buttonDiv").append(b);
		};
	};

// this generates a new button from form entry and then clears the form
$(document.body).on('click', '#submitBtn', function() {
	event.preventDefault();
	var newPet = $("#formInput").val().trim();
	petType.push(newPet);
	renderButtons();
	$("#formInput").val("");
	});

$(document.body).on('click', '.petTypeButton', function() {
	pets = $(this).attr("data-name");
	$("#foundDiv").empty();
	getPetFinder(pets);
});



function getPetFinder(type) {

	var geocoder = new google.maps.Geocoder();
    var queryURL = "https://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92122&count=6&lastOffset=15";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {
    		
    		var fullAddresses = [];

    		var length = response.petfinder.pets.pet.length;
    		for(var i=0;i<length;i++) {
    			var petDiv = $("<div class='gifs panel panel-info'>");
    			var breed = response.petfinder.pets.pet[i].breeds.breed;
				var display = $("<p>");

			 	if(Array.isArray(breed)) {
					//console.log("breed" + breed[0].$t);
					display.text("Breed: " + breed[0].$t);
				} else if(typeof breed == 'object') {
					//console.log("breed" + breed.$t);
					display.text("Breed: " + breed.$t);
				}
    			var labelNum = i + 1;
    			var label = $("<h4>").text(" Gif #" + labelNum);

    			var address1 = response.petfinder.pets.pet[i].contact.address1.$t;
    			var address2 = response.petfinder.pets.pet[i].contact.address2.$t;
    			var city = response.petfinder.pets.pet[i].contact.city.$t;
    			var state = response.petfinder.pets.pet[i].contact.state.$t;
    			var zip = response.petfinder.pets.pet[i].contact.zip.$t;

    			var fullAddress = "";// = address1 + " " + address2 + " " + city + " " + state + " " + zip;
    			
    			if(address1 !== undefined) {
    				fullAddress += address1 + " ";
    			}
    			if(address2 !== undefined) {
    				fullAddress += address2 + " ";	
    			}
    			if(city !== undefined) {
    				fullAddress += city + " ";	
    			}
    			if(state !== undefined) {
    				fullAddress += state + " ";	
    			}
    			if(zip !== undefined) {
    				fullAddress += zip;	
    			}
    			fullAddresses.push(fullAddress);

        		geocodeAddress(geocoder, map, fullAddress);

    			//console.log(response.petfinder.pets.pet[i].media.photos.photo.length);
    			// console.log(response.petfinder.pets.pet[i].media.photos.photo[0].$id);
    			var imgSrc = response.petfinder.pets.pet[i].media.photos.photo[0].$t;

    			for(var j=0;i<response.petfinder.pets.pet[i].media.photos.photo.length;j++) {
    				//console.log(response.petfinder.pets.pet[i].media.photos.photo[j]["@size"]);
    				if(response.petfinder.pets.pet[i].media.photos.photo[j]["@size"] == 'x') {
    					imgSrc = response.petfinder.pets.pet[i].media.photos.photo[j].$t;
    					//console.log(response.petfinder.pets.pet[i].media.photos.photo[j]);
    					break;
    				}
    			}
    			var label = $("<h4>").text("Result #" + labelNum);
    			//console.log(imgSrc);
 	    		var stillImage = $("<img>");
 	     		stillImage.attr("src", imgSrc);
 	     		stillImage.attr("style", "width:300px;height:300px");
 	     		stillImage.addClass("btn btn-default gifImage");
    		 	var gifDiv = $("<div>");
    		 	gifDiv.append(label); 	    	   		
    		 	gifDiv.append(display);
    		 	gifDiv.append(stillImage);
    		 	gifDiv.attr("id", "gif" + i);
    		 	gifDiv.addClass("container");
    		 	gifDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"30px", "text-align":"center"})
    		 	$("#giphyDiv").append(gifDiv);
    		}
    		console.log(fullAddresses);
        	console.log(JSON.stringify(fullAddresses));

        	// console.log(map);
        	// geocodeAddress(geocoder, map, "5220 fiore ter san diego ca 92122");

    	});
	};
});

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 33.020, lng: -117.202}
        });
        geocoder = new google.maps.Geocoder();
}

function geocodeAddress(geocoder, resultsMap, address) {
	console.log(address, geocoder, resultsMap);

    geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location)
     		console.log(results);
            console.log("geocode plot successful" + address);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
 }