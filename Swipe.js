let petSearch; 
let catsFromAPI = [];
let petFinderURL = "https://api.petfinder.com/v2/animals?type=cat&status=adoptable&?limit=20";

$().ready(() => {
  console.log("Jquery is loading...");

  function catSwipe() {
    if (catsFromAPI.length < 1) {
      authFunc()
      .then((data) => {
          let token = data.access_token
          fetch(petFinderURL, {
              method: 'get',
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          })
          .then(response => response.json())
          .then((data) => {
            // console.log("animals: " + data.animals);
            data.animals.map((x) => {
              if(x.photos.length > 0){
                catsFromAPI.push(x)
              }
              else if (x.photos === undefined) {
              }
            });
            // console.log("api " + catsFromAPI);
            petSearch = catsFromAPI.pop()
            renderPet(petSearch); 
            let paginationURL = data.pagination._links["next"].href;
            buildPetFinderURL(paginationURL);
            console.log("just switched to a new page");

          })
      })
    }
    else {
      petSearch = catsFromAPI.pop();
      renderPet(petSearch);
    }
  }

  function renderPet(petSearch) {
    $("#draggable").append(`
    <img src="${imageSrc(petSearch.photos)}"/>
    <h3>${petSearch.name}</h3>
    `); 
  }

  function buildPetFinderURL(url) {
    let baseURL = "https://api.petfinder.com";
    petFinderURL = baseURL.concat(url);
  }

  $("#submit_no").on("click", () => {
    $("#draggable").empty();
    catSwipe();
    console.log("NO")
  })

  $("#submit_yes").on("click", () => {
   // saveToPetList(petSearch);
    //console.log(saveToPetList(petSearch));
    $("#draggable").empty();
    catSwipe();
    console.log("YES")
  })

  catSwipe();
  $("#draggable").draggable({axis: "x"});

  // let petlist;

  // function saveToPetList(petSearch){
	
  //   var petlistJSON = localStorage.getItem(petlist);
  //   petlist = JSON.parse(petlistJSON);

  //   if(petlist === null){
  //    	petlist = [];
  //   }

  //   petlist.push(petSearch);
  //   petlistJSON = JSON.stringify(petlist);
  //   localStorage.setItem(petlist, petlistJSON);
  // }
})


