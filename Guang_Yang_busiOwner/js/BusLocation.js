/**Initialize the map with starting point at BCIT burnaby */
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ja3JvbGFuZCIsImEiOiJja29uaG02Y2MwMWswMnZwaWJnYTQ0enlxIn0.GlQoTbJgVw3Kn7vI3Ua_Pg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-123.0014, 49.2516],
    zoom: 13
});


// Initialize the geolocate control.
var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

// Add the control to the map.
map.addControl(

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
}))