/**
 * A MapManager for plotting location based efficiency on top of a google maps map
 *
 *var fromColor = { // yellow
  red: 208,
  green: 221,
  blue: 40
};

var toColor = { // purple
  red: 102,
  green: 45,
  blue: 145
};
 *

Options should be an object containing:

{
  LAT: 47.654109,    // current latitude
  LNG: -122.304331,  // current longitude
  HEIGHT: 300,       // height of the map
  WIDTH: 700         // width of the map
}

 */

var Maps = require('uwcenterstack-evebackend').Maps;
var MapManager = function(options) {
    // this.WIDTH = 700;
    // this.HEIGHT = 300;
    $.extend(this, options);
    //this.location = currentLocation;
    this.MAP_ID = "MapManager-map";
    this.CANVAS_ID = "MapManager-canvas";
    this.reqEfficiency = false;

    this.getMap = function () {
        var container = $('<div style="position:relative;"></div>');
        this.canvas = $('<canvas>', {
            "id": this.CANVAS_ID,
            css: {
                "position": "absolute",
                "z-index": "200",
                "width": this.WIDTH + "px",
                "height": this.HEIGHT + "px"
            }
        }).appendTo(container);

        this.map = $("<div>", {
            "id": this.MAP_ID,
            css: {
                "position": "absolute",
                "z-index": "100",
                "width": this.WIDTH + "px",
                "height": this.HEIGHT + "px"
            }
        }).appendTo(container);


        this.directionsDisplay = new google.maps.DirectionsRenderer();
        // TODO query for current location, return map around that location
        var seattle = new google.maps.LatLng(this.LAT, this.LNG);
        var mapOptions = {
            zoom: 15,
            center: seattle,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
            }
        };

        this.googleMapsMap = new google.maps.Map(this.map.get(0), mapOptions);
        this.directionsDisplay.setMap(this.googleMapsMap);

        var roadAtlasStyles = [{
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": -8
            }, {
                "gamma": 1.18
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "saturation": -100
            }, {
                "gamma": 1
            }, {
                "lightness": -24
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "administrative",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": -30
            }]
        }, {
            "featureType": "administrative",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "saturation": -100
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "saturation": -100
            }]
        }];




        var styledMapOptions = {};

        var usRoadMapType = new google.maps.StyledMapType(
            roadAtlasStyles, styledMapOptions);

        this.googleMapsMap.mapTypes.set('usroadatlas', usRoadMapType);
        this.googleMapsMap.setMapTypeId('usroadatlas');

        // add event listeners
        var me = this;
        // google.maps.event.addListener(this.googleMapsMap, 'center_changed', function () {
        //     me.clearMap();
        //     console.log("center changed");
        //     me.displayEfficiency(function () {});
        // });


        // google.maps.event.addListener(me.googleMapsMap, 'zoom_changed', function () {
        //     me.clearMap();
        //     console.log("zoom changed");
        //     google.maps.event.addListenerOnce(me.googleMapsMap, 'bounds_changed', function (e) {
        //         me.displayEfficiency();
        //     });
        // });

        this.canvas.get(0).fillStyle = "rgba(255, 255, 255, 0.5)";
        this.context = this.canvas.get(0).getContext('2d');
        this.canvas.get(0).width = this.WIDTH;
        this.canvas.get(0).height = this.HEIGHT;
        return container;
    };

    this.showEfficiency = function (currentLocation, callback) {
        this.clearMap();
        var me = this;
        this.reqEfficiency = true;
        me.googleMapsMap.setCenter(new google.maps.LatLng(currentLocation.location.lat, currentLocation.location.long));
        this.displayEfficiency(function() {});

    };

    this.displayEfficiency = function (callback) {
        console.log("display efficiency");
        var start = new Date().getTime();

        var bounds = new google.maps.LatLngBounds();
        bounds = this.googleMapsMap.getBounds();

        var topLeft = bounds.getNorthEast();
        var bottomRight = bounds.getSouthWest();

        var me = this;
        var left = topLeft.lng();
        var top = topLeft.lat();
        var right = bottomRight.lng();
        var bottom = bottomRight.lat();
        var height = Math.abs(top - bottom);
        var width = Math.abs(left - right);
        var canvasWidth = me.canvas.get(0).width;
        var canvasHeight = me.canvas.get(0).height;
        console.log(top, bottom, left, right);
        (new Maps()).getDataPoints({
            top: top,
            bottom: bottom,
            left: left,
            right: right
        }, function(data) {
            console.log(data);
            console.log(topLeft);
            console.log(bottomRight);
            var end = new Date().getTime();
            console.log('milliseconds passed', end - start);


            console.log("canvas height: " + canvasHeight + " canvas width: " + canvasWidth);
            var zoom = me.googleMapsMap.getZoom();
            var radius = Math.pow(1.18, zoom);
            _.each(data, function (point) {
                var latLng = new google.maps.LatLng(point.geo[0], point.geo[1]);
                if (bounds.contains(latLng)) { // this point lies in the map, plot it on the canvas!
                    // calculate distance from top left
                    var fromTop = Math.abs(top - point.geo[0]);
                    var fromLeft = Math.abs(left - point.geo[1]);
                    var ratioTop = fromTop / height;
                    var ratioLeft = fromLeft / width;

                    var centerX = canvasWidth - Math.floor(ratioLeft * canvasWidth);
                    var centerY = Math.floor(ratioTop * canvasHeight);

                    me.context.beginPath();
                    me.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                    me.context.fillStyle = me.calculateColor(point.efficiency);
                    me.context.fill();
                    me.context.closePath();
                }
            });
            callback();
        });
    };

    this.calculateColor = function (efficiency) {
        efficiency = parseInt(efficiency);

        if (efficiency > 50) {
            return 'rgba(208, 221, 40, .1)'; // yellow - good
        } else {
            return 'rgba(102, 45, 145, .1)'; // purple - bad
        }
    };

    this.clearMap = function () {
        this.context.clearRect(0, 0, this.canvas.get(0).width, this.canvas.get(0).height);
    };

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
};