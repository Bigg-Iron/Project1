console.log("JavaScript is loaded")
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

// // this generates a new button from form entry and then clears the form
// $(document.body).on('click', '#submitBtn', function() {
// 	event.preventDefault();
// 	var newPet = $("#formInput").val().trim();
// 	petType.push(newPet);
// 	renderButtons();
// 	$("#formInput").val("");
// 	});

$(document.body).on('click', '.petTypeButton', function() {
	pets = $(this).attr("data-name");
	$("#foundDiv").empty();
	// for (i=0; i<10; i++) {
		// console.log(i);
		getPetFinder(pets);
	// };
});


function getPetFinder(type) {
    var queryURL = "https://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92129";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {
    		console.log(response);
    		// var length = response.petfinder.pets.pet.length;
    		for(var i=0;i<6;i++) {
        		var petDiv = $("<div class='gifs panel panel-info'>");
        		var petBreed = response.petfinder.pets.pet[i].breeds.breed;
                var petName = response.petfinder.pets.pet[i].name.$t;
                var petSex = response.petfinder.pets.pet[i].sex.$t;
                var petSize = response.petfinder.pets.pet[i].size.$t;
                var petAge = response.petfinder.pets.pet[i].age.$t;
                // var petStreet = response.petfinder.pets.pet[i].contact.address1
                var petCity = response.petfinder.pets.pet[i].contact.city.$t;
                var petState = response.petfinder.pets.pet[i].contact.state.$t;
                var petZip = response.petfinder.pets.pet[i].contact.zip.$t;
                var petID = response.petfinder.pets.pet[i].id.$t;
                // var shelterId = response.petfinder.pets.pet[i].shelterID.$t;
    			var breedLabel = $("<p>");
    			 if(Array.isArray(petBreed)) {
    				// console.log("Breed" + petBreed[0].$t);
    				breedLabel.text("Breed: " + petBreed[0].$t + " (" + petAge + ")");
    			} else if(typeof petBreed == 'object') {
    				// console.log("Breed" + petBreed.$t);
    				breedLabel.text("Breed: " + petBreed.$t + " (" + petAge + ")");
		}

    		console.log(response.petfinder.pets.pet[i].media.photos.photo.length);
    		// console.log(response.petfinder.pets.pet[i].media.photos.photo[0].$id);
    		var imgSrc = response.petfinder.pets.pet[i].media.photos.photo[0].$t;

    		// for(var j=0;i<response.petfinder.pets.pet[i].media.photos.photo.length;j++) {
    		// 	console.log(response.petfinder.pets.pet[i].media.photos.photo[j]);
    		// 	if(response.petfinder.pets.pet[i].media.photos.photo[j].size == 'x') {
    		// 		imgSrc = response.petfinder.pets.pet[i].media.photos.photo[j].$t;
    		// 		break;
    		// 	}
    		// }
    		var nameLabel = $("<h3>").text("Meet "+ petName + "!");
            // var ageLabel = $("<h5>").text("Age: "+ petAge);
            // var sizeLabel = $("<h5>").text("Size: "+ petSize);
            // var sexLabel = $("<h5>").text("Sex: "+ petSex);
    		var imgSrc = response.petfinder.pets.pet[i].media.photos.photo[i].$t;
    		  console.log(imgSrc);
 	    	var petPic = $("<img>");
 	     	    petPic.attr("src", imgSrc);
 	     	    petPic.attr("style", "width:300px;height:300px");
 	     	    petPic.addClass("btn btn-default petImage");
    		 var petDiv = $("<div>");
                petDiv.append(nameLabel); 	    	   		
                petDiv.append(breedLabel);
                // petDiv.append(ageLabel);
                // petDiv.append(sizeLabel);
                // petDiv.append(sexLabel);
                petDiv.append(petPic);
                petDiv.attr("id", "pet" + i);
                petDiv.addClass("container");
                petDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"30px", "text-align":"center"})
    		 $("#resultsDiv").append(petDiv);
    		}
	});

	// function test() {
	// 	console.log("test run")
	// }
};




//this closes the (document).ready function.  Do not delete!
});