console.log("JavaScript is loaded")
$(document).ready(function(){

var petType = "";

$(document.body).on('click', '.petTypeButton', function() {
    petType = $(this).attr("data-name");
    console.log("the " + petType + " button was clicked");
    getPetFinder(petType);
});


function getPetFinder(type) {
    var queryURL = "https://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92122";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {
            console.log(response);
            var length = response.petfinder.pets.pet.length;
            for(var i=0;i<length;i++) {
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

                var nameLabel = $("<h3>").text("Meet "+ petName + "!");
                // var ageLabel = $("<h5>").text("Age: "+ petAge);
                // var sizeLabel = $("<h5>").text("Size: "+ petSize);
                // var sexLabel = $("<h5>").text("Sex: "+ petSex);
                var imgSrc = response.petfinder.pets.pet[i].media.photos.photo[7].$t;
                console.log("result "+ i + " = " + imgSrc);

                var petPic = $("<img>");
                    petPic.attr("src", imgSrc);
                    // petPic.attr("style", "width:300px;height:300px");
                    petPic.addClass("btn btn-default petImage");

                 var petDiv = $("<div>");
                    // petDiv.append(nameLabel);                   
                    // petDiv.append(breedLabel);
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
};




//this closes the (document).ready function.  Do not delete!
});