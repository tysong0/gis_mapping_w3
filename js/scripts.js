
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

var STARTING_CENTER = [-73.9, 40.7]

// Set bounds to San Francisco, California.
const bounds = [
    [-144.75460, 10.14845], // Southwest coordinates
    [-44.18682, 60.65736] // Northeast coordinates
];

mapboxgl.accessToken = 'pk.eyJ1IjoidGlhbnlzb25nIiwiYSI6ImNsdWx1OGVodzBqcWwyaW9hOW1oaWRnOWwifQ.E4RNl8ESZulQlGSzXECAMw';
const map = new mapboxgl.Map({
    container: 'container', // container ID
    center: STARTING_CENTER, // starting position [lng, lat]
    style: 'mapbox://styles/mapbox/outdoors-v12',
    zoom: 10, // starting zoom
    maxBounds: bounds // Set the map's geographical boundaries.
})

map.on('load', function () {
    map.resize();
});

//iterate
earthquakes.forEach(function(earthquakerecord) {
   
    var magnitude = earthquakerecord.mag;
    var colour;
    var utcDate = `${earthquakerecord.time}`;  // ISO-8601 formatted date returned from the list
    var localDate = new Date(utcDate);


    // If the earthquake is more significant than M5.0
    if (magnitude >= 5.0) {
      colour = "red";
    
    // If the earthquake is between M4.0 and 5.0
    } else if (magnitude >= 4.0 ) {
      colour = "orange";
    
    // If the earthquake is more minor than M4.0
    } else {
      colour = "yellow";
    }

    //create popup of quake info
    const popup = new mapboxgl.Popup({ 
        offset: 40,
        anchor: 'bottom'
    }).setText(
        `This is a M${earthquakerecord.mag} earthquake, happened at ${localDate}.`
    );

    //create the markers
    new mapboxgl.Marker({ 
    color: colour 
    })
    .setLngLat([earthquakerecord.longitude, earthquakerecord.latitude])
    .setPopup(popup)
    .addTo(map);
})

// add a scale to the map
map.addControl(new mapboxgl.ScaleControl());




