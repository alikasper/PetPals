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
            });

            if (catsFromAPI.length > 0) {
              petSearch = catsFromAPI.pop()
              renderPet(petSearch);
            }
            
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
    <div class="pet-container">
      <img class="pet-card-img-top" src="${imageSrc(petSearch.photos)}"/>
      <h3>${petSearch.name}</h3>
    </div>
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
    saveToPetList(petSearch);
    $("#draggable").empty();
    catSwipe();
    console.log("YES")
  })

  catSwipe();
  $("#draggable").draggable({axis: "x"});

  function saveToPetList(petSearch) {

    var petlistJSON = localStorage.getItem('petlist');
    var petlist = JSON.parse(petlistJSON);

    if (petlist == null) {
      petlist = [];
    }
    petlist.push(petSearch)
    petlistJSON = JSON.stringify(petlist)
    console.log(petlistJSON)
    localStorage.setItem("petlist", petlistJSON)
    
  }
})


