/** 
 * Checks if user is logged in.
 * 
 * */
$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loggedInUser = user;

        } else {
            console.warn("No user detected!");
            window.location.href = "login.html";
        }
    });

    /**
     * Register business.
     * 
     * @param busName name of business
     * @param address address of business
     * @param phone phone number of business
     * @param city city of business
     * @param state prov of business
     * @param zip post code of business
     * 
     */
    function updateBusiness(busName, busPhone, address, city, state, zip) {
        var updateBusiness = db.collection("Business");

        var user = firebase.auth().currentUser;
        updateBusiness.add({
            UID: user.uid,
            bName: busName,
            bLocation: address,
            bphoneNo: busPhone,
            bState: state,
            bCity: city,
            bZip: zip
        }).then(function() {
            window.location.href = './BusRegisFeedBack.html';
        });
    }

    /**
     * Retrieves business form input and updates business profile.
     */
    function getInfo() {
        $("#submit").click(function() {
            var busName = $("#busname").val();
            var busPhone = $("#phone").val();
            var address = $("#inputAddress").val() + ", " + $("#inputAddress2").val();
            var city = $("#inputCity").val();
            var state = $("#inputState").val();
            var zip = $("#inputZip    ").val();

            updateBusiness(busName, busPhone, address, city, state, zip);
        });
    }
    getInfo();
});