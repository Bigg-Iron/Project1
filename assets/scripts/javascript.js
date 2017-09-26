console.log("JavaScript is loaded")
$(document).ready(function(){

$("#results").hide();

// declare and initialize global variables
var petType = "";
var petBreed = "";
var petName = "";
var petDescription = "";
var petSex = "";
var petSize = "";
var petAge = "";
var petStreet = "";
var petCity = "";
var petState = "";
var petZip = "";
var petID = "";
var imgSrc = "";
var breedModalId = "";
var imageModalId = "";
var nameModalId = "";
var ageModalId = "";
var sizeModalId = "";
var sexModalId = "";
var descriptionModalId = "";
var divId = "";

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
                petDescription = response.petfinder.pets.pet[i].description.$t;
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

                // create the ID's
                divId = "#results" + (i+1);
                nameModalId = "#modalName" + (i+1);                
                imageModalId = "#modalImage" + (i+1);
                descriptionModalId = "#modalDescription" + (i+1);                
                breedModalId = "#modalBreed" + (i+1);
                sexModalId = "#modalSex" + (i+1);
                ageModalId = "#modalAge" + (i+1);
                sizeModalId = "#modalSize" + (i+1);

                // populate the divs
                $(divId).attr("src", imgSrc);
                $(divId).css({"max-width":"100%", "object-fit":"cover", "border":"1px solid #555", "border-radius":"8px", "margin":"15px"});

                $(nameModalId).text("Meet " + petName + "!");
                $(imageModalId).attr("src", imgSrc);
                $(descriptionModalId).text(petDescription);
                $(breedModalId).text("Breed: " + petBreed);
                $(sexModalId).text("Sex: " + petSex);
                $(ageModalId).text("Age: " + petAge);
                $(sizeModalId).text("Size: " + petSize);

            }
    });
};




//this closes the (document).ready function.  Do not delete!
});