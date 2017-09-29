// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7Tl5ZzIxV33LqQqvRyOvcDFKtc9Vselk",
  authDomain: "project1-c6321.firebaseapp.com",
  databaseURL: "https://project1-c6321.firebaseio.com",
  projectId: "project1-c6321",
  storageBucket: "project1-c6321.appspot.com",
  messagingSenderId: "1039060630480"
};

firebase.initializeApp(config);

var database = firebase.database();



$("#sendMessageButton").on('click', function () {

  event.preventDefault();
  // Grabs user input
  var name = $("#name").val().trim();
  var message = $("#message").val().trim();
  var email = $("#email").val().trim();
  var phone = $("#phone").val().trim();

  // Creates local temporary object for holding user name and comments
  var newUsers = {
    name: name,
    comment: message,
    email: email,
    phone: phone
  };

  var formIsValid = true;
  


  console.log(name);
  if(!name) {
    console.log("name not present")
    formIsValid = false;
    $("#name").effect( "shake", 
    {times:4}, 1000 );
  }

  if(!message) {
    console.log("message not present")
    formIsValid = false;
    $("#message").effect( "shake", 
    {times:4}, 1000 );
  }

    // email doesn't have @ sign... 
  if (email == "" && email.indexOf("@") == -1) {
    console.log("Not a valid email")
    formIsValid = false;
    $("#email").effect( "shake", 
    {times:4}, 1000 );
  }

  if (phone.length != 10) {
    console.log("phone is not 10 digits")
    formIsValid = false;
    $("#phone").effect( "shake", 
    {times:4}, 1000 );
  }



  // Uploads user data to the database
  if (formIsValid) {
    database.ref('/contactForm/user').push(newUsers);
  }

  // Console logging for tests
  console.log(newUsers);

  // Clears all of the text-boxes
  if(formIsValid) {
  $("#name").val("");
  $("#message").val("");
  $("#email").val("");
  $("#phone").val("");
}

});






