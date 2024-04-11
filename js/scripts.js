
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

var STARTING_CENTER = [-73.9, 40.7]

mapboxgl.accessToken = 'pk.eyJ1IjoidGlhbnlzb25nIiwiYSI6ImNsdWx1OGVodzBqcWwyaW9hOW1oaWRnOWwifQ.E4RNl8ESZulQlGSzXECAMw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: STARTING_CENTER, // starting position [lng, lat]
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    zoom: 10, // starting zoom
    bearing: 30,
})

// create the popup
const classbuilding = new mapboxgl.Popup({ offset: 25 }).setText(
    '60 5th Avenue.',
);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
    .setLngLat(STARTING_CENTER)
    .addTo(map)
    .setPopup(classbuilding) // sets a popup on this marker
    .addTo(map);


// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});


    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - STARTING_CENTER[0]) > 180) {
            STARTING_CENTER[0] += e.lngLat.lng > STARTING_CENTER[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(STARTING_CENTER).setHTML("AA").addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });




