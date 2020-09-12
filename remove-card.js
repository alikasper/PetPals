function removeCard(btn) {
  const animalID = btn.getAttribute("data-animalID");
  btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
  removeInfo(animalID);
}

function removeInfo(id) {
  var retrievedData = localStorage.getItem("petlist");

  var petlist2 = JSON.parse(retrievedData).filter((pet) => pet.id != id);

  localStorage.setItem("petlist", JSON.stringify(petlist2));
}
