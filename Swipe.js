let petSearch; 
let catsFromAPI = [];
let petFinderURL = "https://api.petfinder.com/v2/animals?type=cat&status=adoptable&?limit=50";

$().ready(() => {
  function catSwipe() {
    if (!catsFromAPI.length) {
      loadPetPhotos();
      // .then(() => {
      //   while (catsFromAPI.length < 1) {
      //   loadPetPhotos();
      //  }
      // })
    }
    else {
      petSearch = catsFromAPI.pop();
      renderPet(petSearch);
    }
  }

  catSwipe(); 

  function loadPetPhotos() {
    authFunc()
    .then((data) => {
        let token = data.access_token
        fetch(getPetFinderSearchURL(), {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then((data) => {
          data.animals.map((x) => {
            if(x.photos.length > 0){
              catsFromAPI.push(x)
            }
          });

          if (catsFromAPI.length > 0) {  //this is when all listings don't have photos
            petSearch = catsFromAPI.pop()
            renderPet(petSearch);
          }
          
          let paginationURL = data.pagination._links["next"].href; //this is the next page after what the url fetched
          setPetFinderSearchURL(paginationURL);
          console.log("just switched to a new page");

        })
    })
  }

  function renderPet(petSearch) {
    $("#draggable").append(`
    <img src="${imageSrc(petSearch.photos)}"/>
    <h3>${petSearch.name}</h3>
    `); 
  }

  function getPetFinderSearchURL() {
    localStorage.getItem(petFinderURL);
    return petFinderURL;
    
  }

  function setPetFinderSearchURL(urlPath) {
    let baseURL = "https://api.petfinder.com";
    petFinderURL = baseURL.concat(urlPath);
    localStorage.setItem('petFinderURL', petFinderURL);
  }

  $("#draggable").draggable({axis: "x"});

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

  function saveToPetList(petSearch) {
    var petlistJSON = localStorage.getItem('petlist');
    var petlist = JSON.parse(petlistJSON);

    if (petlist == null) {
      petlist = [];
    }
    petlist.push(petSearch)
    petlistJSON = JSON.stringify(petlist)
    localStorage.setItem("petlist", petlistJSON)
  }
})


