
<script src="https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key=AIzaSyDnKRBDN4y27IXg8_of6hhTS0q5IQX1nDw" async defer></script>
<script>
// Variables for Google maps
var map, mapElem, markerImg, infoWindow, marker;
var markers = [], infoWindows = [];
var mapOptions = {
  mapTypeId: 'roadmap',
  //zoom: 13,
  //scrollwheel: false,
};

function initialize() {
  markerImg = {
    url:'https://uploads-ssl.webflow.com/5909bb029da28867b17f79b2/5d1c1fa72b2ad277f94568e0_pin.png',
    size: new google.maps.Size(46, 57),
    anchor: new google.maps.Point(23, 54),
  }
                  
  // Display a map on the page
  mapElem = document.getElementById('map_canvas');
  map = new google.maps.Map(mapElem, mapOptions);
  map.setTilt(45);

  // Loop through our array of cars
  for(i = 0; i < cars.length; i++) {
    var car = cars[i];
  
    // Generate an infowindow content for the marker
  	var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(
      '<a href="'+car.url+'"><div class="bg-pic-car" style="background:url('+car.photo+') center/cover no-repeat"></div></a>' +
      '<a href="'+car.url+'"><p>$'+car.pricehr+'/hour '+car.year+' '+car.make+' '+car.modal+'</p></a>'
    );
    infoWindows.push(infoWindow);
  
    // Place a marker on the map
    createMarker(car.lat, car.lng, i);
  }
  
  // Center the map fitting all markers on the screen
  fitToMarkers();
}

function createMarker(x, y, i) {
  marker = new google.maps.Marker({
    map: map,
    icon: markerImg,
    position: new google.maps.LatLng(x,y),
    title: cars[i].name
  });
  marker._index = i;
  markers.push(marker);
  
  // Click event on marker
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      // Close last opened infowindow if any
      if(infoWindow) infoWindow.close();
      // Open clicked infowindow
      infoWindow = infoWindows[i];
      infoWindow.open(map, marker);
    }
  })(marker, i));
}

function mapResize() {
  google.maps.event.trigger(map, "resize");
  fitToMarkers();
}

function fitToMarkers() {
  map.setZoom(15);
  var bounds = new google.maps.LatLngBounds();
  for(var i = 0; i < markers.length; i++) {
   bounds.extend(markers[i].getPosition());
  }
  map.fitBounds(bounds);
  map.setZoom(14); // zoom out when done so markers on the top can be seen
}

// When Webflow has loaded,
Webflow.push(function() {

	// Resize event
  $(window).resize(function() {
  
    // Do nothing if mobile
    if($(window).width() < 768) return;

    // Resize map if function is defined
    if(typeof mapResize === 'function') mapResize();
  });
});
</script>
