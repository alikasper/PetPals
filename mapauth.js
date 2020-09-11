function initMap() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.903145, -99.23366)
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapsKey}&callback=initMap`
    document.body.appendChild(script);
}
window.onload = loadScript;