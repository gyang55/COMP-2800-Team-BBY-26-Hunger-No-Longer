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

/**
 * Updates user to assume role of Volunteer.
 * 
 * @param address address of volunteer
 * @param city city of volunteer
 * @param prov prov of volunteer
 * @param number phone number of volunteer
 */
function updateVolunteer(address,city,prov,number) {
    var updateVolunteer = db.collection("volunteer");
    var user = firebase.auth().currentUser;

    updateVolunteer.doc(user.uid).set({
        userDisplayName: user.displayName,
        userEmail: user.email,
        updateAddress: address,
        updateCity: city,
        updateProv: prov,
        updateNumber: number,
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

        updateVolunteer(updateAddress, updateCity, updateProv, updateNumber);
    });
}
getInfo();