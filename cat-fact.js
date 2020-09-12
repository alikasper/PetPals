let catFact = document.getElementById("cat-fact");

fetch("https://catfact.ninja/fact?max_length=140")
  .then((response) => response.json())
  .then((data) => {
    catFact.innerHTML = data.fact;
  });
