/** 
 * Checks if user is logged in.
 * 
 * */
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            loggedInUser = user;
        } else {
            console.warn("No user detected!");
            window.location.replace = "index.html";
        }
    });
});

/**
 * 
 */

// Select all checkboxes with the name 'days' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=days]");
//var checkboxesForTime = document.querySelectorAll("input[type=checkbox][name=time]");
let availableDays = []
let availableTime = []

// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    availableDays = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      
    availableDays = availableDays.toString();
    console.log(availableDays)
  })
});
// Checkbox for Time
/* checkboxesForTime.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      availableTime = 
        Array.from(checkboxesForTime) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        
    
      console.log(availableTime.toString());
    })
  }); */
/**
 * Updates user to assume role of Volunteer.
 * 
 * @param address address of volunteer
 * @param city city of volunteer
 * @param prov prov of volunteer
 * @param number phone number of volunteer
 */
 function updateVolunteer(address,city,prov,number,availableDays) {
    var updateVolunteer = db.collection("volunteer");
    var user = firebase.auth().currentUser;

    updateVolunteer.doc(user.uid).update({
        userDisplayName: user.displayName,
        userEmail: user.email,
        updateAddress: address,
        updateCity: city,
        updateProv: prov,
        updateNumber: number,
        availDay: availableDays,
        date: Date.now()
    }, {
        merge: true
    })
    .then(function () {
        window.location.href = "volunteer-confirm.html";
    });
}

/**
 * Retrieves user input and updates volunteer profile.
 */
function getInfo() {
    document.getElementById("button-sub").addEventListener('click', function () {
        var updateAddress = document.getElementById("address-input").value;
        var updateCity = document.getElementById("city-input").value;
        var updateProv = document.getElementById("province-input").value;
        var updateNumber = document.getElementById("number-input").value;
        var availDay = availableDays;

        updateVolunteer(updateAddress, updateCity, updateProv, updateNumber, availDay);
    });
}
getInfo();

/**
 * Toggle Infomation for User for times available for Volunteering
 */
 //var checkbox = $('#form-check form-switch'),
     //monday = $('#availableMonday');

 //monday.hide();
 
/*  //checkbox.on('click', function() {
     if($(this).is(':checked')) {
       monday.show();
       monday.find('input').attr('required', true);
       console.log(monday);
     } else {
       monday.hide();
       monday.find('input').attr('required', false);
     }
 }) */

