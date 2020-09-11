$().ready(() => {
  console.log("Jquery is loading...");

  var petlistJSON = localStorage.getItem("petlist");
  var petlist = JSON.parse(petlistJSON);

  var mapcenter = { lat: 40.903145, lng: -99.23366 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: mapcenter,
  });

  async function renderMarkers(animallist) {
    // var script = document.createElement("script");
    // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAXJ-vtESufpQES_Z3AtBL8AlkBxNpl5mU&callback=initMap`;
    // script.defer = true;

    // window.initMap = function () {
    //   var mapcenter = { lat: 40.903145, lng: -99.23366 };
    //   var map = new google.maps.Map(document.getElementById("map"), {
    //     zoom: 4,
    //     center: mapcenter,
    //   });
    // };
    // document.head.appendChild(script);

    var location = petlist.map((currentanimal) => {
      console.log (currentanimal)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${currentanimal.contact.address.city},+${currentanimal.contact.address.state}&key=${geoKey}
        `)
        .then((response) => response.json())
        .then((data) => {
        //   console.log(data);
          console.log(currentanimal.name + " is located at: " +data.results[0].formatted_address);
          console.log(data.results[0].geometry.location);
          new google.maps.Marker({
            position: data.results[0].geometry.location,
            map: map,
            title: currentanimal.name,
            // label: currentanimal.name.charAt(0),
            icon: currentanimal.photos[0].small,
            animation: google.maps.Animation.DROP
          });
        });
    });
  }
  renderMarkers();
});
