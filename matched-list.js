$(document).ready(() => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: 'post',
        body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: pfapiKey,
            client_secret: pfapiSecret
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
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
            console.log(data.animals)
            function renderPetPals(catsList) {
                let noPhotoAvail = "images/no_image.png";
                let imageSrc = function(array) {
                    if (array.length === 0) {
                        return noPhotoAvail;
                    }
                    else {
                        return array[0].large;
                    }
                }

                let petHTMLs = catsList.map((currentCat) => {
                    return `<div class="pet-card" style="width: 300px;">
                <img class="pet-card-img-top" src="${imageSrc(currentCat.photos)}" alt="Pet card image cap" height="300px" width="200px">
                        <div class="pet-card-body">
                            <h5 class="pet-card-name"><b>Name:</b> ${currentCat.name}</h5>
                            <p class="pet-card-bio"><b>Bio:</b> ${currentCat.description}</p>
                            <p class="pet-card-breed"><b>Primary Breed:</b> ${currentCat.breeds.primary}</p>
                            <p class="pet-card-color"><b>Primary Color:</b> ${currentCat.colors.primary} </p>
                            <p class="pet-card-age"><b>Age:</b> ${currentCat.age}</p>
                            <a class="pet-card-pf-listing" href="${currentCat.url}">Go to the Original PetFinder Listing</a>
                        <button type="button" class="remove-button">Remove!</button>
                        </div>
                    </div>`
        
                })
                return petHTMLs.join("");
            }
            $(".pet-pals-container").html(renderPetPals(data.animals));
        })
    })  
})