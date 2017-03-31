"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create a map.
 *
 * @param {string} apiPath API path string
 * @param {string} containerId container ID to which map will be attached
 * @param {{lat: float, lng: float}} initialRegion initial region is the region
 *          where map will aim by default
 * @param {bool} isPolitical political map will be rendered if true, normal map
 *          otherwise
 * @param {bool} showHeatmap render heatmap on the map
 * @param {bool} showMarkers render markers on the map
 */
function createMap(apiPath, containerId) {
    var initialRegion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { lat: 39.50, lng: -98.35 };
    var isPolitical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var showHeatmap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var showMarkers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

    var geocoder = void 0;
    var map = void 0;

    // Collection of marker objects which are rendered on map view
    var markerBag = [];

    /**
     * Marker class represents Marker datastructure which contains
     * information about marker.
     *
     * Note: do not confuse with google.maps.Marker
     *
     * @class Marker
     */

    var Marker = function Marker(address, title, id, zip) {
        _classCallCheck(this, Marker);

        this.address = address;
        this.title = title;
        this.id = id;
        this.zip = zip;
    };

    /**
     * Create interface
     */


    function createUI() {
        var mapContainer = document.getElementById(containerId);

        // Set container height
        mapContainer.style.height = '100%';

        function initGeocoder() {
            return new google.maps.Geocoder();
        }

        function initMap() {

            var style = [];

            if (isPolitical) {
                style = [{
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                }, {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#f5f5f5"
                    }]
                }, {
                    "featureType": "administrative.neighborhood",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "administrative.locality",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "administrative.country",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#bdbdbd"
                    }]
                }, {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#8d8d8d"
                    }, {
                        "visibility": "on"
                    }, {
                        "weight": 1.5
                    }]
                }, {
                    "featureType": "poi",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                }, {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                }, {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#757575"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#dadada"
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#616161"
                    }]
                }, {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#e5e5e5"
                    }]
                }, {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#eeeeee"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#c9c9c9"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9e9e9e"
                    }]
                }];
            } else {
                style = '';
            }

            return new google.maps.Map(mapContainer, {
                center: initialRegion,
                scrollwheel: true,
                zoom: 5,
                styles: style
            });
        }

        // Global references
        geocoder = initGeocoder();
        map = initMap();
    }

    // Improvement: if data already fetched, no reason to fetch it again
    function fetchMarkers() {
        $.ajax({
            type: "GET",
            url: apiPath,
            success: function success(data) {
                var parsedData = JSON.parse(data);
                var markers = collectMarkers(parsedData);
                var bag = createMarkers(markers);
            }
        });
    }

    function fetchHeatmap() {
        $.ajax({
            type: "GET",
            url: apiPath,
            success: function success(data) {
                var parsedData = JSON.parse(data);
                var markers = collectMarkers(parsedData);
                var bag = renderHeatmap(markers);
            }
        });
    }

    function collectMarkers(data) {
        var markers = [];

        data.events.forEach(function (event) {
            var pureLocations = dataSentinel(event.locations);

            pureLocations.forEach(function (location) {
                markers.push(new Marker(event.address, event.title, event.id, location));
            });
        });

        return markers;
    }

    function createMarkers(markers) {
        // Global variable, stores google.maps.Marker objects
        markerBag = [];

        markers.forEach(function (marker) {
            var m = new google.maps.Marker({
                // Performance issue on a big dataset
                // animation: google.maps.Animation.DROP,
                map: map,
                position: marker.zip,
                title: marker.title
            });

            markerBag.push(m);

            google.maps.event.addListener(m, 'click', function () {
                var info = new google.maps.InfoWindow();
                info.setContent('<b>Address:</b> ' + marker.address + '<br>' + '<b>Title:</b> ' + marker.title + '<br>' + '<b>ID:</b> ' + marker.id + '<br>');
                info.open(map, this);
            });
        });
    }

    function renderHeatmap(markers) {
        var coord = [];

        markers.forEach(function (marker) {
            coord.push(new google.maps.LatLng(marker.zip));
        });

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: coord,
            map: map,
            radius: 45,
            maxIntensity: 10
        });
    }

    /**
     * Data sentinel secures data consistency
     *
     * Filter out data which is not belong to US from the dataset.
     *
     * Feature: We can cut data by states in this fashion
     *      http://answers.google.com/answers/threadview?id=149284
     */
    function dataSentinel(data) {
        var north_lat = 49.3457868; // top
        var west_lng = -124.7844079; // left
        var east_lng = -66.9513812; // right
        var south_lat = 24.7433195; // bottom

        var clean = data.filter(function (point) {
            return south_lat <= point.lat && point.lat <= north_lat && west_lng <= point.lng && point.lng <= east_lng;
        });

        return clean;
    }

    function renderUI() {
        if (showHeatmap) fetchHeatmap();
        if (showMarkers) fetchMarkers();
    }

    createUI();
    renderUI();
}