/** 
 * Checks if user is logged in.
 * 
 * */
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            loggedInUser = user;
            defaultProfilePic();
            writeUserProfilePicField();
        } else {
            console.warn("No user detected!");
            window.location.href = "login.html";
        }
    });
});

/**
 * 
 * @param {*} address 
 * @param {*} city 
 * @param {*} prov 
 * @param {*} number 
 */

/**
 * Updates user to assume role of Volunteer.
 * 
 * @param address 
 * @param city 
 * @param prov 
 * @param number 
 */
 function updateVolunteer(address,city,prov,number) {
    var updateVolunteer = db.collection("volunteer");

    var user = firebase.auth().currentUser;
    updateVolunteer.add({
        userDisplayName: user.displayName,
        userEmail: user.email,
        userID: user.uid,
        updateAddress: address,
        updateCity: city,
        updateProv: prov,
        updateNumber: number,
    }).then(function () {
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

        updateVolunteer(updateAddress,updateCity,updateProv,updateNumber);
    });
}
getInfo();