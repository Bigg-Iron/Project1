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
	for (i=0; i<10; i++) {
		console.log(i);
		getPetFinder(i, pets);
	};
});


function getPetFinder(i, type) {

	var queryURL = "http://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92129";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {
    		console.log("pull request" ,response);
    		var breed = response.petfinder.pets.pet[i].breeds.breed.$t;
    		var description = response.petfinder.pets.pet[i].description.$t;
    		var age = response.petfinder.pets.pet[i].age.$t;
    		var name = response.petfinder.pets.pet[i].name.$t;
    		var sex = response.petfinder.pets.pet[i].sex.$t;
    		// // var image = response.petfinder.pets.pet[i].media.photos.photo.x.$t;

    		// var petDiv = $("<div class='pets panel panel-info'>");
    		// var display1 = $("<p>").text("Name: " + name);
    		// var display2 = $("<p>").text("Age: " + age);
    		// var display3 = $("<p>").text("Sex: " + sex);
    		// var display4 = $("<p>").text("Age: " + breed);

 	    // 	var petImage = $("<img>");
 	    // 	petImage.attr("src", image);
 	    // 	petImage.addClass("btn btn-default petDisplay");
    		// petDiv.append(display1);
    		// petDiv.append(display2); 	    	   		
    		// petDiv.append(display3); 	    	   		
    		// petDiv.append(display4); 	    	   		    	   		 	    	   		
    		// petDiv.append(petImage);
    		// petDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		// $("#foundDiv").append(petDiv);
	});

	function test() {
		console.log("test ran")
	}
};




//this closes the (document).ready function.  Do not delete!
});