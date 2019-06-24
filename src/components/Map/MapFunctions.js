
export const createMap = () => {
  const google = window.google;

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.229676, lng: 21.012229 },
    zoom: 5,
    disableDefaultUI: true
  });

  return map
}

export const addMarker = (map, latLng, title, icon) => {
  const google = window.google;
  const marker = new google.maps.Marker({
    map: map,
    position: latLng
  });
  if (title) marker.setTitle(title)
  if (icon) marker.setIcon(icon)
  return marker
}

export const clearMarkers = (marker) => {
  if (marker) marker.setMap(null)
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

        resolve(latLng);
      } else {
        if (status === 'INVALID_REQUEST')
        alert('Nie znaleziono adresu. Podaj więcej informacji i spróbuj ponownie.');
        resolve(false);
      }
    });
  });
}

export const loadGeoJson = (map, mapLayer) => {
  // const google = window.google;
  return new Promise((resolve, reject) => {
    const geoJson = map.data.addGeoJson(mapLayer);
    map.data.setStyle(function (feature) {
      let color = 'rgba(125, 125, 125, 0.15)';
      let strokeColor = 'rgba(125, 125, 125, 0.75)';
      if (feature.getProperty('isSelected')) {
        color = 'rgba(138, 225, 13, 0.75)'
        strokeColor = 'rgba(138, 225, 13, 0.45)';
      }
      return ({
        fillColor: color,
        strokeColor: strokeColor,
        strokeWeight: 1,
        clickable: false
      });
    });

    map.data.addListener('mouseover', function (event) {
      map.data.revertStyle();
      map.data.overrideStyle(event.feature, { strokeWeight: 4 });
    });

    map.data.addListener('mouseout', function (event) {
      map.data.revertStyle();
    });
    resolve(geoJson);
  });
}

export const findAddress = () => {
  // const google = window.google;
  return new Promise((resolve, reject) => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const latlng = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };

        const google = window.google;
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'location': latlng }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {

              resolve(results[0].formatted_address);

            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      });
    }
    else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
}
