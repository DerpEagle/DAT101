"use strict";

const CarTypes = [
  { value: 1, caption: "Aston Martin" },
  { value: 2, caption: "Bentley" },
  { value: 3, caption: "Alfa Romeo" },
  { value: 4, caption: "Ferrari" },
  { value: 5, caption: "Subaru" },
  { value: 6, caption: "Porsche" },
  { value: 7, caption: "Tesla" },
  { value: 8, caption: "Toyota" },
  { value: 9, caption: "Renault" },
  { value: 10, caption: "Peugeot" },
  { value: 11, caption: "Suzuki" },
  { value: 12, caption: "Mitsubishi" },
  { value: 13, caption: "Nissan" },
];

const GirlsNames = ["Anne", "Inger", "Kari", "Marit", "Ingrid", "Liv", "Eva", "Berit", "Astrid", "Bjørg", "Hilde", "Anna", "Solveig", "Marianne", "Randi", "Ida", "Nina", "Maria", "Elisabeth", "Kristin"];

const MovieGenre = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

//--- Part 1 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function cmbTask1CalculateClick() {
  const width = Number(document.getElementById("txtRectWidth").value);
  const height = Number(document.getElementById("txtRectHeight").value);

  const circumference = 2 * (width + height);
  const area = width * height;

  document.getElementById("txtTask1Output").innerHTML =
    `Circumference = ${circumference}, Area = ${area}`;
}

document.getElementById("cmbTask1Calculate").addEventListener("click", cmbTask1CalculateClick);

//--- Part 2 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const task2Words = [];

function txtTask2WordKeyPress(event) {
  if (event.key === "Enter") {
    const word = document.getElementById("txtTask2Word").value;
    if (word !== "") {
      task2Words.push(word);
    }
    document.getElementById("txtTask2Output").innerHTML =
      `Number of words = ${task2Words.length}, Words: ${task2Words.join(", ")}`;
    document.getElementById("txtTask2Word").value = "";
  }
}

document.getElementById("txtTask2Word").addEventListener("keypress", txtTask2WordKeyPress);

//--- Part 3 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function cmbTask3CheckAnswerClick() {
  const checkboxes = document.querySelectorAll('input[name="chkTask3"]');
  const selected = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selected.push(checkbox.value);
    }
  });

  if (selected.length === 0) {
    document.getElementById("txtTask3Output").innerHTML = "No checkboxes selected.";
  } else {
    document.getElementById("txtTask3Output").innerHTML =
      `Selected checkboxes: ${selected.join(", ")}`;
  }
}

document.getElementById("cmbTask3CheckAnswer").addEventListener("click", cmbTask3CheckAnswerClick);

//--- Part 4 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const divTask4Cars = document.getElementById("divTask4Cars");

for (let i = 0; i < CarTypes.length; i++) {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "carType";
  radio.value = CarTypes[i].value;
  radio.id = `car${CarTypes[i].value}`;

  const label = document.createElement("label");
  label.htmlFor = radio.id;
  label.textContent = CarTypes[i].caption;

  radio.addEventListener("change", function () {
    document.getElementById("txtTask4Output").innerHTML =
      `You selected: ${CarTypes[i].caption}`;
  });

  divTask4Cars.appendChild(radio);
  divTask4Cars.appendChild(label);
  divTask4Cars.appendChild(document.createElement("br"));
}

//--- Part 5 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

function selectTask5AnimalsChange() {
  const select = document.getElementById("selectTask5Animals");
  const selectedText = select.options[select.selectedIndex].text;
  document.getElementById("txtTask5Output").innerHTML = `You selected: ${selectedText}`;
}

document.getElementById("selectTask5Animals").addEventListener("change", selectTask5AnimalsChange);

//--- Part 6 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectTask6Girls = document.getElementById("selectTask6Girls");

for (let i = 0; i < GirlsNames.length; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = GirlsNames[i];
  selectTask6Girls.appendChild(option);
}

function selectTask6GirlsChange() {
  const select = document.getElementById("selectTask6Girls");
  const selectedText = select.options[select.selectedIndex].text;
  document.getElementById("txtTask6Output").innerHTML = `You selected: ${selectedText}`;
}

document.getElementById("selectTask6Girls").addEventListener("change", selectTask6GirlsChange);

//--- Part 7 ----------------------------------------------------------------------------------------------
/* Put your code below here!*/

const selectMovieGenre = document.getElementById("selectMovieGenre");

for (let i = 0; i < MovieGenre.length; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = MovieGenre[i];
  selectMovieGenre.appendChild(option);
}

let movieCount = 0;

function cmbAddMovieClick() {
  const title = document.getElementById("txtMovieTitle").value;
  const genre = selectMovieGenre.options[selectMovieGenre.selectedIndex].text;
  const director = document.getElementById("txtMovieDirector").value;
  const rate = document.getElementById("txtMovieRate").value;

  movieCount++;

  const table = document.getElementById("tblMovies");
  const row = table.insertRow();

  row.insertCell().textContent = movieCount;
  row.insertCell().textContent = title;
  row.insertCell().textContent = genre;
  row.insertCell().textContent = director;
  row.insertCell().textContent = rate;

  document.getElementById("txtMovieTitle").value = "";
  document.getElementById("txtMovieDirector").value = "";
  document.getElementById("txtMovieRate").value = "5";
}

document.getElementById("cmbAddMovie").addEventListener("click", cmbAddMovieClick);
