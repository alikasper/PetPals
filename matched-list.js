$(document).ready(() => {

    var petlistJSON = localStorage.getItem('petlist');
    var petlist = JSON.parse(petlistJSON);

    // console.log(petlist)

    function renderCatCards() {
        authFunc()
        .then((data) => {
            // console.log(data)
        
            let token = data.access_token
            fetch("https://api.petfinder.com/v2/animals", {
                method: 'get',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((data) => {
                // console.log(data.animals)
                function renderPetPals(catsList) {
                    // console.log (catsList)

                    let petHTMLs = petlist.map((currentCat) => {
                        // console.log(currentCat);
                        return `<div class="pet-card" style="width: 300px;">
                            <img class="pet-card-img-top" src="${imageSrc(currentCat.photos)}" alt="Pet card image cap" height="300px" width="200px">
                            <div class="pet-card-body">
                                <h5 class="pet-card-name"><b>Name:</b> ${currentCat.name}</h5>
                                <p class="pet-card-bio"><b>Bio:</b> ${currentCat.description}</p>
                                <p class="pet-card-breed"><b>Primary Breed:</b> ${currentCat.breeds.primary}</p>
                                <p class="pet-card-color"><b>Primary Color:</b> ${currentCat.colors.primary} </p>
                                <p class="pet-card-age"><b>Age:</b> ${currentCat.age}</p>
                                <a class="pet-card-pf-listing" target="_blank" href="${currentCat.url}">Go to the Original PetFinder Listing</a>
                                <br />
                                <button type="button" class="remove-button btn btn-dark">Remove</button>
                            </div>
                        </div>`
            
                    })
                    return petHTMLs.join("");
                }
                $(".pet-pals-container").html(renderPetPals(data.animals));
            })
        })
    }

    renderCatCards();   

})

let noPhotoAvail = "images/no_image.png";
let imageSrc = function(array) {
    if (array.length === 0) {
        return noPhotoAvail;
    }
    else {
        return array[0].large;
    }
}