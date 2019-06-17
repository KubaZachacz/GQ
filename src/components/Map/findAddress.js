const findAddress = (latitude, longitude) => {
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

export default findAddress;