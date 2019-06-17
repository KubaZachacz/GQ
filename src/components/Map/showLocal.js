const showLocal = (input) => {
  // const google = window.google;

  if (input) {
    const google = window.google;
    const geocoder = new google.maps.Geocoder();

    let latLang;

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 10,
    });

    geocoder.geocode({ 'address': input }, function (results, status) {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        latLang = results[0].geometry.location;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    return map;
  }
}

export default showLocal;

