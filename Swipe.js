$().ready(() => {
  console.log("Jquery is loading...");
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((data) => {
      console.log("catimage is loading...");
      console.log(data[0].url);
      $("#draggable").append(`
        <img src="${data[0].url}" />
        `);
    });
});
