console.log("JavaScript is loaded")

// var map;
// var geocoder;

$(document).ready(function(){

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
    $(document).scrollTop($("#results").offset().top);
});

$(document.body).on('click', '#showMoreButton', function () {
    event.preventDefault();
    console.log("The 'showMoreButton' was clicked");
    $('#showMoreButton').hide();
    $('#showMore').slideDown(1500);
});


function getPetFinder(type) {
    var queryURL = "https://api.petfinder.com/pet.find?key=d39bdf5f87198eb7c88ec715df088049&format=json&animal=" + type + "&location=92122&count=12";
    $.ajax({
        type : 'GET',
        data : {},
        url : queryURL + '&callback=?' ,
        dataType: 'json'}).done(function(response) {

            var fullAddresses = [];
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

                // normalize responses
                if (petSex == "F") {
                    petSex = "Female";
                } else {
                    petSex = "Male";
                }
                if (petSize == "S") {
                    petSize = "Small";
                } else if (petSize == "M") {
                    petSize = "Medium";
                } else {
                    petSize = "Large";
                }

                if(Array.isArray(petBreed)) {
                    petBreed = (petBreed[0].$t);
                    // console.log(petBreed);
                } else if(typeof petBreed == 'object') {
                    petBreed = (petBreed.$t);
                    // console.log(petBreed);
                }


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

                //geocodeAddress(geocoder, map, fullAddress);

                // populate the divs
                id = "#results" + (i+1);
                //console.log(id);
                $(id).attr("src", imgSrc);
                $(id).css({"max-width":"100%", "object-fit":"cover", "border":"1px solid #555", "border-radius":"8px", "margin":"15px"});
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

// function initMap() {
//         console.log(document.getElementById('map'));
//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 12,
//           center: {lat: 32.959, lng: 117.265}
//         });
//         geocoder = new google.maps.Geocoder();

//         console.log("initMap", map, geocoder);
// }

// function geocodeAddress(geocoder, resultsMap, address) {
//     console.log(address, geocoder, resultsMap);

//     geocoder.geocode({'address': address}, function(results, status) {
//           if (status === 'OK') {
//             resultsMap.setCenter(results[0].geometry.location)
//             console.log(results);
//             console.log("geocode plot successful" + address);
//             var marker = new google.maps.Marker({
//               map: resultsMap,
//               position: results[0].geometry.location,
//               center: results[0].geometry.location
//             });
//           } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//           }
//         });
//  }




//this closes the (document).ready function.  Do not delete!
});