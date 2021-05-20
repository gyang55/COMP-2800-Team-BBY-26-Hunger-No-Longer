/**Initialize the map with starting point at BCIT burnaby */
/* mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ja3JvbGFuZCIsImEiOiJja29uaG02Y2MwMWswMnZwaWJnYTQ0enlxIn0.GlQoTbJgVw3Kn7vI3Ua_Pg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-123.0014, 49.2516],
    zoom: 13
}); */


// Initialize the geolocate control.
/* var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
 */
// Add the control to the map.
/* map.addControl(

    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
    })
);
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
})) */


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

    // Listen for click on map location
    google.maps.event.addListener(map, "click", (event) => {
        // add Marker
        addMarker({
            location: event.latLng
        });
    })

    // Add Makers to Array
    markerArray = [{
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

    // Loop through markers
    for (let i = 0; i < markerArray.length; i++) {
        addMarker(markerArray[i]);
    }

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