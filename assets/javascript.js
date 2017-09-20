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
		// console.log(i);
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
    		// var still = 
    		// var petDiv = $("<div class='gifs panel panel-info'>");
    		// var rating = response.data[i].rating;
    		// var display = $("<p>").text("Rating: " + rating);
    		// var labelNum = i + 1;
    		// var label = $("<h4>").text(title + " Gif #" + labelNum);
 	    // 	var stillImage = $("<img>");
 	    // 	stillImage.attr({"data-still":still, "data-animate":animate, "data-state":"still", "src":still, "id":title+"label"+i});
 	    // 	stillImage.addClass("btn btn-default gifImage");
    		// gifDiv.append(label); 	    	   		
    		// gifDiv.append(display);
    		// gifDiv.append(stillImage);
    		// gifDiv.attr("id", "gif" + i);
    		// gifDiv.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		// $("#giphyDiv").append(gifDiv);
	});

	function test() {
		console.log("test ran")
	}
};




//this closes the (document).ready function.  Do not delete!
});