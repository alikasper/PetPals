$().ready(() => {

  var petlistJSON = localStorage.getItem("petlist");
  var petlist = JSON.parse(petlistJSON);

  var mapcenter = { lat: 40.903145, lng: -99.23366 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: mapcenter,
  });

  function renderMarkers(animallist) {
    var location = petlist.map((currentanimal) => {
      let peturl = currentanimal.url;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${currentanimal.contact.address.city},+${currentanimal.contact.address.state}&key=${geoKey}
          `)
        .then((response) => response.json())
        .then((data) => {
          var marker = new google.maps.Marker({
            position: data.results[0].geometry.location,
            map: map,
            title: currentanimal.name,
            icon: currentanimal.photos[0].small,
            animation: google.maps.Animation.DROP,
            url: peturl,
          });
          google.maps.event.addListener(marker, "click", function () {
            window.open(this.url, "_blank");
          });
        });
    });
  }
  renderMarkers();
});
