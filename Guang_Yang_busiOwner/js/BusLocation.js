let map, infoWindow;

function initMap() {
    // Map options
    var options = {
        center: {
            lat: 49.2516,
            lng: -123.0014
        },
        zoom: 11,
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    // Create a button to locate the users
    infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "My location";
    locationButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    // Click to locate users
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation ?
            "Error: The Geolocation service failed." :
            "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }




    // Listen for click on map location
    google.maps.event.addListener(map, "click", (event) => {
        // add Marker
        addMarker({
            location: event.latLng
        });
    })

    let markerArray = [];
    db.collection('Business')
        .get()
        .then((snap) => {
            snap.forEach(doc => {

                console.log(doc.data().longitude + " " + doc.data().latitude);
                let location = {};
                location.lat = doc.data().latitude;
                location.lng = doc.data().longitude;
                let content = `<h2>${doc.data().bName}</h2>`
                let objGeo = {};
                objGeo.location = location;
                objGeo.content = content;
                markerArray.push(objGeo);
                console.log(markerArray);
                for (let i = 0; i < markerArray.length; i++) {
                    addMarker(markerArray[i]);
                }
            })
        })

    // Add Makers to Array
    /* markerArray = [{
        location: {
            lat: 49.27633,
            lng: -123.12113
        },
        content: `<h2>Blue Water Cafe</h2>`
    }, {
        location: {
            lat: 49.28355,
            lng: -123.11921
        },
        content: `<h2>Hawksworth Restaurant</h2>`
    }];
 */
    // Loop through markers
    /* for (let i = 0; i < markerArray.length; i++) {
        addMarker(markerArray[i]);
    } */

    // Add Marker
    function addMarker(property) {
        const marker = new google.maps.Marker({
            position: property.location,
            map: map,

        });

        if (property.content) {
            const detailWin = new google.maps.InfoWindow({
                content: property.content
            })
            marker.addListener('click', () => {
                detailWin.open(map, marker);
            })
        }

    }
}