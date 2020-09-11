$().ready(() => {
  console.log("Jquery is loading...");

  var petlistJSON = localStorage.getItem("petlist");
  var petlist = JSON.parse(petlistJSON);

  function renderMarkers(animallist) {
    var zipcode = petlist.map((currentanimal) => {
        console.log(currentanimal)
    })
  }

  function initMap() {
    var uluru = { lat: -25.344, lng: 131.036 };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    var marker = new google.maps.Marker({ position: uluru, map: map });
  }
  initMap();
  renderMarkers();
});
