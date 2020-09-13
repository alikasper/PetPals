let petSearch;
let catsFromAPI = [];
let petFinderURL =
  "https://api.petfinder.com/v2/animals?type=cat&status=adoptable&?limit=100";

$().ready(() => {

  function catSwipe() {
    if (!catsFromAPI.length) {
      loadPetPhotos().then((result) => {
        if (!result) {
          catSwipe();
        }
      });
    } else {
      petSearch = catsFromAPI.pop();
      renderPet(petSearch);
    }
  }

  catSwipe();

  function loadPetPhotos() {
    return authFunc().then((data) => {
      let token = data.access_token;
      return fetch(getPetFinderSearchURL(), {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.animals.map((x) => {
            if (x.photos.length > 0) {
              catsFromAPI.push(x);
            }
          });

          let paginationURL = data.pagination._links["next"].href; 
          setPetFinderSearchURL(paginationURL);

          if (catsFromAPI.length > 0) {
            petSearch = catsFromAPI.pop();
            renderPet(petSearch);
            return true;
          }

          return false;
        });
    });
  }

  function renderPet(petSearch) {
    $("#draggable").html(`
    <div class="pet-container">
      <img class="pet-card-img-top" src="${imageSrc(petSearch.photos)}"/>
      <h3>${petSearch.name}</h3>
    </div>
    `);
  }

  function getPetFinderSearchURL() {
    localStorage.getItem(petFinderURL);
    return petFinderURL;
  }

  function setPetFinderSearchURL(urlPath) {
    let baseURL = "https://api.petfinder.com";
    petFinderURL = baseURL.concat(urlPath);
    localStorage.setItem("petFinderURL", petFinderURL);
  }

  $("#draggable").draggable({
    axis: "x",
    revert: true,
  });

  // EVENT LISTENERS 

  $("#submit_no").droppable({
    accept: "#draggable",
    over: function (event, ui) {
      $("#draggable").empty();
      $("#draggable").html("<p>Fetching your potential forever friend...</p>");
      catSwipe();
    },
  });

  $("#submit_no").on("dropover");

  $("#submit_yes").droppable({
    accept: "#draggable",
    over: function (event, ui) {
      saveToPetList(petSearch);
      $("#draggable").empty();
      $("#draggable").html("<p>Fetching your potential forever friend...</p>");
      catSwipe();
    },
  });

  $("#submit_yes").on("dropover");

  $("#submit_no").on("click", () => {
    $("#draggable").empty();
    $("#draggable").html("<p>Fetching your potential forever friend...</p>");
    catSwipe();
  });

  $("#submit_yes").on("click", () => {
    saveToPetList(petSearch);
    $("#draggable").empty();
    $("#draggable").html("<p>Fetching your potential forever friend...</p>");
    catSwipe();
  });

  // LOCAL STORAGE

  function saveToPetList(petSearch) {
    var petlistJSON = localStorage.getItem("petlist");
    var petlist = JSON.parse(petlistJSON);

    if (petlist == null) {
      petlist = [];
    }
    petlist.push(petSearch);
    petlistJSON = JSON.stringify(petlist);
    localStorage.setItem("petlist", petlistJSON);
  }
});
