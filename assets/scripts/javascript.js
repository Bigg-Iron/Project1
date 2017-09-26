console.log("JavaScript is loaded")
$(document).ready(function(){

$("#results").hide();

// declare and initialize global variables
var petType = "";
var petBreed = "";
var petName = "";
var petSex = "";
var petSize = "";
var petAge = "";
var petStreet = "";
var petCity = "";
var petState = "";
var petZip = "";
var petID = "";
var imgSrc = "";
var breedLabel = "";
var nameLabel = "";
var ageLabel = "";
var sizeLabel = "";
var sexLabel = "";
var id = "";

$(document.body).on('click', '.petTypeButton', function() {
    event.preventDefault();
    petType = $(this).attr("data-name");
    console.log("the " + petType + " button was clicked");
    getPetFinder(petType);
    $("#results").show();
    // $("#mapSection").show();
});

$(document.body).on('click', '#showMoreButton', function () {
    event.preventDefault();
    console.log("The 'showMoreButton' was clicked");
    $('#showMoreButton').hide();
    $('#showMore').slideDown(1500);
});


function getPetFinder(type) {
    var queryURL = "https://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92122";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {
            console.log(response);
            // var length = response.petfinder.pets.pet.length;
            for(var i=0;i<12;i++) {
                // get object data
                petBreed = response.petfinder.pets.pet[i].breeds.breed;
                petName = response.petfinder.pets.pet[i].name.$t;
                petSex = response.petfinder.pets.pet[i].sex.$t;
                petSize = response.petfinder.pets.pet[i].size.$t;
                petAge = response.petfinder.pets.pet[i].age.$t;
                petStreet = response.petfinder.pets.pet[i].contact.address1
                petCity = response.petfinder.pets.pet[i].contact.city.$t;
                petState = response.petfinder.pets.pet[i].contact.state.$t;
                petZip = response.petfinder.pets.pet[i].contact.zip.$t;
                petID = response.petfinder.pets.pet[i].id.$t;
                imgSrc = response.petfinder.pets.pet[i].media.photos.photo[2].$t;
                console.log("result "+ i + " = " + imgSrc);

                // create labels
                // breedLabel = $("<p>");
                //     if(Array.isArray(petBreed)) {
                //     // console.log("Breed" + petBreed[0].$t);
                //         breedLabel.text("Breed: " + petBreed[0].$t + " (" + petAge + ")");
                //         } else if(typeof petBreed == 'object') {
                //     // console.log("Breed" + petBreed.$t);
                //         breedLabel.text("Breed: " + petBreed.$t + " (" + petAge + ")");
                //     }
                // nameLabel = $("<h5>").text("Meet "+ petName + "!");
                // ageLabel = $("<h5>").text("Age: "+ petAge);
                // sizeLabel = $("<h5>").text("Size: "+ petSize);
                // sexLabel = $("<h5>").text("Sex: "+ petSex);

                // populate the divs
                id = "#results" + (i+1);
                console.log(id);
                $(id).attr("src", imgSrc);
                $(id).css({"max-width":"100%", "object-fit":"cover", "border":"1px solid #555", "border-radius":"8px", "margin":"15px"});

            }
    });
};




//this closes the (document).ready function.  Do not delete!
});