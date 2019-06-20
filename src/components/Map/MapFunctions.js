import { async } from "q";

export const createMap = () => {
  const google = window.google;

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.229676, lng: 21.012229 },
    zoom: 5,
    disableDefaultUI: true
  });

  return map
}

export const showAddress = (map, input) => {
  return new Promise((resolve, reject) => {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    let latLng;
    geocoder.geocode({ 'address': input }, function (results, status) {
      if (status === 'OK') {
        latLng = results[0].geometry.location;
        map.setCenter(latLng);
        map.setZoom(10);
        var marker = new google.maps.Marker({
          map: map,
          position: latLng
        });
        resolve(latLng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  });
}

export const loadGeoJson = (map, mapLayer) => {
  // const google = window.google;
  return new Promise((resolve, reject) => {
    const geoJson = map.data.addGeoJson(mapLayer);
    map.data.setStyle({
      // icon: '//example.com/path/to/image.png',
      fillColor: 'rgba(239, 237, 177)',
      strokeWeight: 2,
    });

    map.data.addListener('mouseover', function (event) {
      map.data.revertStyle();
      map.data.overrideStyle(event.feature, { strokeWeight: 8 });
      // console.log(event.feature.getProperty('jpt_nazwa_'));
      // console.log(event);
    });

    map.data.addListener('mouseout', function (event) {
      map.data.revertStyle();
    });
    resolve(geoJson);
  });
}

export const findAddress = (latitude, longitude) => {
  // const google = window.google;
  const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  const google = window.google;
  if (latitude && longitude) {
    var geocoder = new google.maps.Geocoder;

    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {

          // console.log(results[0].formatted_address);
          document.getElementById("search-bar").value = results[0].formatted_address;

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
