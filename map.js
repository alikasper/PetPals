$().ready(() => {
  console.log("Jquery is loading...");

  var petlistJSON = localStorage.getItem("petlist");
  var petlist = JSON.parse(petlistJSON);

  var mapcenter = { lat: 40.903145, lng: -99.23366 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: mapcenter,
  });

  function renderMarkers(animallist) {
    map;
    var location = petlist.map((currentanimal) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${currentanimal.contact.address.city},+${currentanimal.contact.address.state}&key=AIzaSyC1-smqE_AncNd3xxyiBR_8kjBfo0pNQEk
        `)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results[0].geometry.location);
          new google.maps.Marker({
            position: data.results[0].geometry.location,
            map: map,
          });
        });
    });
  }

  renderMarkers();
});
