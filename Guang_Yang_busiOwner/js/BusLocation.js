/* Mapbox initialization and features
 * source: https://docs.mapbox.com/mapbox-gl-js/api/geography/ 
 */
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ja3JvbGFuZCIsImEiOiJja29uaG02Y2MwMWswMnZwaWJnYTQ0enlxIn0.GlQoTbJgVw3Kn7vI3Ua_Pg';
var map = new mapboxgl.Map({

    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-123, 49.25353], // starting position
    zoom: 10, // starting zoom

});

// Initialize the geolocate control.
var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a trackuserlocationstart event occurs.
geolocate.on('trackuserlocationstart', function() {
    console.log('A trackuserlocationstart event has occurred.')
});

var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
});
map.addControl(scale);

scale.setUnit('metric');

map.on('load', function() {
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        zoom: 13, // Set the zoom level for geocoding results
        placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
        bbox: [-123.39206, 49.27801] // Set a bounding box

    });
    // Add the geocoder to the map
    map.addControl(geocoder, 'top-left'); // Add the search box to the top left
    geocoder.on('result', function(data) { // When the geocoder returns a result
        console.log(data);
        var point = data.result.center; // Capture the result coordinates

        marker.setLngLat(point).addTo(map); // Add the marker to the map at the result coordinates
        var tileset = 'rockroland.108yyase'; // replace this with the ID of the tileset you created
        var radius = 1609; // 1609 meters is roughly equal to one mile
        var limit = 50; // The maximum amount of results to return
        var query = 'https://api.mapbox.com/v4/' + tileset + '/tilequery/' + point[0] + ',' + point[1] + '.json?radius=' + radius + '&limit= ' + limit + ' &access_token=' + mapboxgl.accessToken;
        $.ajax({ // Make the API call
            method: 'GET',
            url: query,
        }).done(function(data) { // Use the response to populate the 'tilequery' source
            map.getSource('tilequery').setData(data);
        })
    });

    map.addSource('tilequery', { // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
        type: "geojson",
        data: {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({ // Add a new layer to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
        id: "tilequery-points",
        type: "circle",
        source: "tilequery", // Set the layer source
        paint: {
            "circle-stroke-color": "white",
            "circle-stroke-width": { // Set the stroke width of each circle: https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-circle-circle-stroke-width
                stops: [
                    [0, 0.1],
                    [18, 3]
                ],
                base: 5
            },
            "circle-radius": { // Set the radius of each circle, as well as its size at each zoom level: https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-circle-circle-radius
                stops: [
                    [12, 5],
                    [22, 180]
                ],
                base: 5
            },
            "circle-color": [ // Specify the color each circle should be
                'match', // Use the 'match' expression: https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                ['get', 'STORE_TYPE'], // Use the result 'STORE_TYPE' property
                'Small Grocery Store', '#008000',
                'Supercenter', '#008000',
                'Superette', '#008000',
                'Supermarket', '#008000',
                'Warehouse Club Store', '#008000',
                'Specialty Food Store', '#9ACD32',
                'Convenience Store', '#FF8C00',
                'Convenience Store With Gas', '#FF8C00',
                'Pharmacy', '#FF8C00',
                '#FF0000' // any other store type
            ]
        }
    });
    var popup = new mapboxgl.Popup; // Initialize a new popup

    map.on('mouseenter', 'tilequery-points', function(e) {
        map.getCanvas().style.cursor = 'pointer'; // When the cursor enters a feature, set it to a pointer

        var title = '<h3>' + e.features[0].properties.STORE_NAME + '</h3>'; // Set the store name
        var storeType = '<h4>' + e.features[0].properties.STORE_TYPE + '</h4>'; // Set the store type
        var storeAddress = '<p>' + e.features[0].properties.ADDRESS_LINE1 + '</p>'; // Set the store address
        var obj = JSON.parse(e.features[0].properties.tilequery); // Get the feature's tilequery object (https://docs.mapbox.com/api/maps/#response-retrieve-features-from-vector-tiles)
        var distance = '<p>' + (obj.distance / 1609.344).toFixed(2) + ' mi. from location' + '</p>'; // Take the distance property, convert it to miles, and truncate it at 2 decimal places

        var lon = e.features[0].properties.longitude;
        var lat = e.features[0].properties.latitude;
        var coordinates = new mapboxgl.LngLat(lon, lat); // Create a new LngLat object (https://docs.mapbox.com/mapbox-gl-js/api/#lnglatlike)
        var content = title + storeType + storeAddress + distance; // All the HTML elements

        popup.setLngLat(coordinates) // Set the popup at the given coordinates
            .setHTML(content) // Set the popup contents equal to the HTML elements you created
            .addTo(map); // Add the popup to the map
    })

    map.on('mouseleave', 'tilequery-points', function() {
        map.getCanvas().style.cursor = ''; // Reset the cursor when it leaves the point
        popup.remove(); // Remove the popup when the cursor leaves the point
    });
});

var marker = new mapboxgl.Marker({
        'color': '#008000'
    }) // Create a new green marker