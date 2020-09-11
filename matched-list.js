$(document).ready(() => {

    var petlistJSON = localStorage.getItem('petlist');
    var petlist = JSON.parse(petlistJSON);

    function renderPetPals(array) {

        let petHTMLs = array.map((currentCat) => {
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

    $(".pet-pals-container").html(renderPetPals(petlist));
})
