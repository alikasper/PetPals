var petSearch; 

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
        // console.log(data)
        let token = data.access_token
        fetch("https://api.petfinder.com/v2/animals?type=cat&?limit=1", {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          petSearch = data.animals[0];
          console.log(petSearch.id);
          $("#draggable").append(`
          <img src="${imageSrc(data.animals[0].photos)}"/>
          <h3>${data.animals[0].name}</h3>
          `);         
          // console.log(imageSrc(data.animals[0].photos))
          // console.log(data)
        })
    })
  }

  $("#submit_no").on("click", () => {
    $("#draggable").empty();
    catSwipe();
    console.log("NO")
  })

  $("#submit_yes").on("click", () => {
    saveToPetList(petSearch);
    console.log(saveToPetList(petSearch));
    $("#draggable").empty();
    catSwipe();
    console.log("YES")
  })

  catSwipe();
  $("#draggable").draggable({axis: "x"});

  let petlist;

  function saveToPetList(petSearch){
	
    var petlistJSON = localStorage.getItem(petlist);
    petlist = JSON.parse(petlistJSON);

    if(petlist === null){
     	petlist = [];
    }

    petlist.push(petSearch);
    petlistJSON = JSON.stringify(petlist);
    localStorage.setItem(petlist, petlistJSON);
  }
})


