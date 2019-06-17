

const loadGeoJson = (map, mapLayer)=>{
    // const google = window.google;

    map.data.addGeoJson(mapLayer);
    map.data.setStyle({
        // icon: '//example.com/path/to/image.png',
        fillColor: 'rgba(239, 237, 177)',
        strokeWeight: 2,
      });

      map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 8});
      });
      
      map.data.addListener('mouseout', function(event) {
        map.data.revertStyle();
      }); 
}

export default loadGeoJson