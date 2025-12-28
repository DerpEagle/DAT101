"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut(
  "--- Part 1 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const part1Array = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

let part1Text = "";
for (let i = 0; i < /*20*/ part1Array.length; i++) {
  const value = part1Array[i]; // -> Every index of part1Array

  if (i === part1Array.length - 1) {
    part1Text += value.toString() + ".";
  } else {
    part1Text += value.toString() + ", ";
  }
}
printOut(part1Text);
printOut(newLine);

printOut(
  "--- Part 2 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const part2Text = part1Array.join(", ");

printOut(part2Text);
printOut(newLine);

printOut(
  "--- Part 3 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const part3Greeting = "Hello there, how are you?";
const greetingArray = part3Greeting.split(" ");
let part3Text = "";
for (let i = 0; i < greetingArray.length; i++) {
  const word = greetingArray[i];
  part3Text += "Index: " + i.toString() + " = " + word + newLine;
}
printOut(part3Text);
printOut(newLine);

printOut(
  "--- Part 4 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const girls = [
  "Anne",
  "Inger",
  "Kari",
  "Marit",
  "Ingrid",
  "Liv",
  "Eva",
  "Berit",
  "Astrid",
  "Bjørg",
  "Hilde",
  "Anna",
  "Solveig",
  "Marianne",
  "Randi",
  "Ida",
  "Nina",
  "Maria",
  "Elisabeth",
  "Kristin",
];

function removeNameFromArray(aArray, aName) {
  let deleteIndex = -1;
  for (let i = 0; i < aArray.length; i++) {
    const name = aArray[i];

    if (name === aName) {
      //Her kan vi slette elementet for eksempel "Hilde"
      //Dette gjør vi ikke her! Her løper vi igjennom og må slette senere.
      //Vi må lagre indeksen i en variabel.
      deleteIndex = i;
      break;
    }
  }
  //Teste om jeg kan slette.
  if (deleteIndex >= 0) {
    printOut(aName + " is found and deleted");
    aArray.splice(deleteIndex, 1);
  } else {
    printOut(aName + " is not found");
  }
}

removeNameFromArray(girls, "Hilde");
printOut(girls);
printOut(newLine);

printOut(
  "--- Part 5 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const boys = [
  "Jakob",
  "Lucas",
  "Emil",
  "Oskar",
  "Oliver",
  "William",
  "Filip",
  "Noah",
  "Elias",
  "Isak",
  "Henrik",
  "Aksel",
  "Kasper",
  "Mathias",
  "Jonas",
  "Tobias",
  "Liam",
  "Håkon",
  "Theodor",
  "Magnus",
];

const allNames = girls.concat(boys);
printOut("Alle navn:" + newLine + allNames.join(newLine));

printOut(
  "--- Part 6 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

class TBook {
  #Title;
  #Author;
  #ISBN;

  constructor(aTitle, aAuthor, aISBN) {
    this.#Title = aTitle;
    this.#Author = aAuthor;
    this.#ISBN = aISBN;
  }

  toString() {
    return "Tittel: " + this.#Title + ", Author: " + this.#Author + ", ISBN: " + this.#ISBN;
  }
}

const books = [
  new TBook("The Hobbit", "J.R.R. Tolkien", "978-0-261-10295-4"),
  new TBook("1984", "George Orwell", "978-0-452-28423-4"),
  new TBook("Harry Potter", "J.K. Rowling", "978-0-7475-3269-9"),
];

for (let i = 0; i < books.length; i++) {
  printOut(books[i].toString());
}
printOut(newLine);

printOut(
  "--- Part 7 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const EWeekDays = {
  WeekDay1: { Value: 0x01, name: "Mandag" },
  WeekDay2: { Value: 0x02, name: "Tirsdag" },
  WeekDay3: { Value: 0x04, name: "Onsdag" },
  WeekDay4: { Value: 0x08, name: "Torsdag" },
  WeekDay5: { Value: 0x10, name: "Fredag" },
  WeekDay6: { Value: 0x20, name: "Lørdag" },
  WeekDay7: { Value: 0x40, name: "Søndag" },
  WorkDays: { Value: 0x01 + 0x02 + 0x04 + 0x08 + 0x10, name: "Arbeidsdager" },
  Weekends: { Value: 0x20 + 0x40, name: "Helg" },
};

const keys = Object.keys(EWeekDays);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const day = EWeekDays[key];
  printOut(key + ": Value = " + day.Value + ", name = " + day.name);
}
printOut(newLine);

printOut(
  "--- Part 8 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

const randomNumbers = [];
for (let i = 0; i < 35; i++) {
  randomNumbers.push(Math.floor(Math.random() * 20) + 1);
}

printOut("Original rekkefølge: " + randomNumbers.join(", "));

const ascending = [...randomNumbers].sort(function (a, b) {
  return a - b;
});
printOut("Stigende rekkefølge: " + ascending.join(", "));

const descending = [...randomNumbers].sort(function (a, b) {
  return b - a;
});
printOut("Synkende rekkefølge: " + descending.join(", "));
printOut(newLine);

printOut(
  "--- Part 9 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

// Tell frekvensen av hvert tall
const frequency = {};
for (let i = 0; i < randomNumbers.length; i++) {
  const num = randomNumbers[i];
  if (frequency[num] === undefined) {
    frequency[num] = 1;
  } else {
    frequency[num]++;
  }
}

// Hent unike tall og sorter dem stigende
const uniqueNumbers = Object.keys(frequency).map(function (key) {
  return parseInt(key);
});
uniqueNumbers.sort(function (a, b) {
  return a - b;
});

// Skriv ut tall og deres frekvens (sortert etter tall)
printOut("Tall og frekvens:");
for (let i = 0; i < uniqueNumbers.length; i++) {
  const num = uniqueNumbers[i];
  printOut("Tallet " + num + " forekommer " + frequency[num] + " gang(er)");
}

// Sorter etter frekvens (synkende), deretter etter tall (stigende)
uniqueNumbers.sort(function (a, b) {
  if (frequency[b] !== frequency[a]) {
    return frequency[b] - frequency[a];
  }
  return a - b;
});

// Skriv ut frekvens og tilhørende tall
printOut(newLine + "Frekvens og tall (sortert etter hyppighet):");
for (let i = 0; i < uniqueNumbers.length; i++) {
  const num = uniqueNumbers[i];
  printOut("Frekvens " + frequency[num] + ": tallet " + num);
}
printOut(newLine);

printOut(
  "--- Part 10 ---------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

// Opprett en tom 2D-array (5 rader x 9 kolonner)
const grid = [];

// Fyll arrayen med rader og kolonner
for (let row = 0; row < 5; row++) {
  grid[row] = [];
  for (let col = 0; col < 9; col++) {
    grid[row][col] = "Rad:" + row + ", Kol:" + col;
  }
}

// Skriv ut arrayen
for (let row = 0; row < grid.length; row++) {
  let rowText = "";
  for (let col = 0; col < grid[row].length; col++) {
    if (col > 0) {
      rowText += " | ";
    }
    rowText += grid[row][col];
  }
  printOut(rowText);
}
printOut(newLine);

