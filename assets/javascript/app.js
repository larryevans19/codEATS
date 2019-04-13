// establish basic query URL 
// *** Need to add OBJECT LITERALS to modify our query URL w/ location from the search bar, etc.
//let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=coffee&location=nyc&price=2";

// Our API Key
// *** Need to make this publicly hidden later
let apiKey = "IkthJOhbnmrhVTwbTB6OGKMzeQSlDeLB9EIS35SKpaE6_N7K7Xo_JVhnh383r_cQNRFPAo9y73ifnCRqHwsuDvxtuV3tCtKC4azI9ciyF-PgiuQbKi4i6ozdnAiwXHYx";
const categoriesList = ["American", "BBQ", "Indian", "Mexican", "Italian", "Chinese", "Japanese", "Korean", "Vegetarian"];

// ============================================================
// FIREBASE Initialization ====================================
// ============================================================

const config = {
    apiKey: "AIzaSyC6JCjLeAlqzN4h32NAPlQdDKVv-Ij5qLc",
    authDomain: "codeats-43f9e.firebaseapp.com",
    databaseURL: "https://codeats-43f9e.firebaseio.com",
    projectId: "codeats-43f9e",
    storageBucket: "codeats-43f9e.appspot.com",
    messagingSenderId: "1033500801409"
  };

firebase.initializeApp(config);
const database = firebase.database();
const rootReference = firebase.database().ref();

// ============================================================
// Custom Functions ===========================================
// ============================================================

function buildCategories() {
    for (let i = 0; i < categoriesList.length; i++) {
        $("#list").append(`<option>${categoriesList[i]}</option>`);
    }
}

buildCategories();

function pushFavorite(dbTestObject) {
    // *** need to update to object literal on user name. Currently hard coded for Cody.
    database.ref("users/cody/favorites").push(dbTestObject);
}

// modify API query after the user hits search
// *** may need to build in some checks later to make sure to account for undefined, etc.
$("#eat").on("click", function(){

    let currentCategory = $("#list").val();
    // *** make SMART later
    let currentLocation = "&location=nyc";
    // *** make SMART later
    let currentPrice = "&price=2";
    let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?text=${currentCategory}${currentLocation}${currentPrice}`;
    console.log(queryURL)
    

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    }).then(function(response) {
        //let dbTestObject = {"name": response.businesses[2].name, "id": response.businesses[2].id};
        console.log(response)
    });

})
let currentCategory = $("#list").val();
console.log(currentCategory)

// ========= Testing below


// *** pulling data one time most for testing. Later, we will need to update this each time you load the lists
rootReference.once("value") // pulls data one time 
    .then(function(snapshot) {
        // returns the array of objects in the users/name/favorites section
        let favoritesList = snapshot.child("users/cody/favorites").val();
        let blackList = snapshot.child("users/cody/blacklist").val();

        // This section of code loops through each item in the favorites list and appends it to a list.
        snapshot.child("users/cody/favorites").forEach(function(favoriteSnapshot) {
            let listItemText = favoriteSnapshot.val().name;
            let listItemID = favoriteSnapshot.val().id;

            let listItem = $("<li>");
            listItem.text(listItemText);
            listItem.attr("id", listItemID);
            // *** uncomment once we have an ID from front end team
            // $("#content").append(listItem);

        })
    });