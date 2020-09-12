var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${gmapsKey}&callback=initMap`;
script.defer = true;

window.initMap = function (){

}

document.head.appendChild(script);