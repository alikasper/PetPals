$().ready(() => {
  console.log("Jquery is loading...");
  // fetch("https://api.thecatapi.com/v1/images/search")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("catimage is loading...");
  //     console.log(data[0].url);
  //     $("#draggable").append(`
  //       <img src="${data[0].url}" />
  //       `);
  //   });

  function catSwipe() {
    authFunc()
    .then((data) => {
        console.log(data)
        let token = data.access_token
        fetch("https://api.petfinder.com/v2/animals?type=cat", {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          $("#draggable").append(`
          <img src="${imageSrc(data.animals[0].photos)}"/>
          <h3>${data.animals[0].name}</h3>
          `);         
        })
    })
  }

  catSwipe();
  $("#draggable").draggable({axis: "x"});

})
