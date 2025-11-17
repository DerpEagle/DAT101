"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut(
  "--- Part 1 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function printTodayDate() {
  //Henter dagens dato
  let today = new Date();

  let options = {
    weekday: "long", //Lager full ukedag
    year: "numeric", //Lager årstall med 4 siffer
    month: "long", //Lager full månedsnavn
    day: "numeric", //Lager dag i måneden uten ledende null
  };
  //konverterer til norsk datoformat
  let norwegianDate = today.toLocaleDateString("no-NB", options);

  printOut("Dagens dato er: " + norwegianDate);
  printOut(newLine);
}
//Kaller på funksjonen
printTodayDate();

printOut(
  "--- Part 2 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function printTodaysDate() {
  let today = new Date();

  let options = {
    weekday: "long", // "mandag"
    year: "numeric", // "2025"
    month: "long", // "mai"
    day: "numeric", // "14."
  };

  // Konverterer til norsk format
  let norwegianDate = today.toLocaleDateString("no-NB", options);

  printOut("Dagens dato er: " + norwegianDate);
  printOut("2XKO har release date den 14. mai 2025.");
  printOut("Dette betyr, at:");

  return today;
}

function daysUntilRelease(releaseDate) {
  let today = new Date();

  let diff = today - releaseDate;

  // Konverterer til dager
  let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

function grandReveal() {
  let releaseDate = new Date("2025-05-14");

  let daysLeft = daysUntilRelease(releaseDate);

  printOut("🔥 Det er " + daysLeft + " dager siden 2XKO kom ut! 🔥");
  printOut(newLine);
  printOut("🎮 Hva er det du driver med? Kom deg hjem og spill! 🎮");
}
grandReveal();

printOut(newLine);

printOut(
  "--- Part 3 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function circle(radius) {
  const geometri = {
    diameter: 2 * radius,
    omkrets: 2 * Math.PI * radius,
    areal: Math.PI * radius * radius,
  };
  return geometri;
}

const c = circle(10);
printOut(
  "Diameter: " +
    c.diameter +
    "cm" +
    ", Omkrets: " +
    c.omkrets.toFixed(2) +
    "cm" +
    ", Areal: " +
    c.areal.toFixed(2) +
    "cm"
);
printOut(newLine);

printOut(
  "--- Part 4 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function rectangle(length, width) {
  const geometri = {
    areal: length * width,
    omkrets: 2 * (length + width),
  };
  return geometri;
}

const r = rectangle(13, 20);
printOut("Areal: " + r.areal + "cm" + ", Omkrets: " + r.omkrets + "cm");
printOut(newLine);

printOut(
  "--- Part 5 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/
function convertTemperature(temp, type) {
  let celsius, fahrenheit, kelvin;

  if (type === "C") {
    celsius = temp;
    fahrenheit = (temp * 9) / 5 + 32;
    kelvin = temp + 273.15;
  } else if (type === "F") {
    celsius = ((temp - 32) * 5) / 9;
    fahrenheit = temp;
    kelvin = celsius + 273.15;
  } else if (type === "K") {
    kelvin = temp;
    celsius = temp - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
  } else {
    printOut("Ukjent temperaturtype! Bruk C, F eller K");
    return;
  }
  printOut("Celsius: " + Math.round(celsius));
  printOut("Fahrenheit: " + Math.round(fahrenheit));
  printOut("Kelvin" + Math.round(kelvin));
}
convertTemperature(20, "C");
printOut("________________");
convertTemperature(69, "F");
printOut("________________");
convertTemperature(300, "K");
printOut(newLine);

printOut(
  "--- Part 6 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function calculateNetPrice(gross, group) {
  group = group.toLowerCase();
  let mvaProsent;

  if (group === "normal") {
    mvaProsent = 25;
  } else if (group === "mat") {
    mvaProsent = 15;
  } else if (group === "hotell") {
    mvaProsent = 10;
  } else if (group === "transport") {
    mvaProsent = 10;
  } else if (group === "kino") {
    mvaProsent = 10;
  } else {
    printOut("Ukjent varegruppe: " + group);
    return NaN;
  }

  let net = (100 * gross) / (100 + mvaProsent);
  let mvaBeløp = gross - net;

  printOut("Varegruppe: " + group);
  printOut("Brutto pris: " + Math.round(gross));
  printOut("mva (" + mvaProsent + "%): " + Math.round(mvaBeløp));
  printOut("Netto pris (uten mva): " + Math.round(net));
  printOut("________________");

  return net;
}
calculateNetPrice(1250, "normal");
calculateNetPrice(230, "mat");
calculateNetPrice(550, "kino");
calculateNetPrice(1200, "fjompenisser");

printOut(newLine);

printOut(
  "--- Part 7 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function calcMotion(fart, distanse, tid) {
  let missing = 0;
  if (fart == null) missing++;
  if (distanse == null) missing++;
  if (tid == null) missing++;

  if (missing > 1) {
    printOut("fart = NaN km/t");
    printOut("distanse = NaN km");
    printOut("tid = NaN timer");
    printOut(newLine);
    return { fart: NaN, distanse: NaN, tid: NaN };
  }

  if (fart == null) {
    if (!tid) {
      printOut("Ugyldig tid for beregning");
      printOut(newLine);
      return { fart: NaN, distanse: NaN, tid: NaN };
    }
    fart = distanse / tid;
  } else if (distanse == null) {
    distanse = fart * tid;
  } else if (tid == null) {
    if (!fart) {
      printOut("Ugyldig fart for beregning");
      printOut(newLine);
      return { fart: NaN, distanse: NaN, tid: NaN };
    }
    tid = distanse / fart;
  }

  printOut("fart = " + fart + " km/t");
  printOut("distanse = " + distanse + " km");
  printOut("tid = " + tid + " timer");
  printOut(newLine);

  return { fart, distanse, tid };
}
calcMotion(null, 100, 2);

printOut(
  "--- Part 8 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function expandText(tekst, maksLengde, tegn, prepend) {
  let mangler = maksLengde - tekst.length;
  if (mangler <= 0) {
    printOut(tekst);
    printOut(newLine);
    return tekst;
  }
  let fyll = tegn.repeat(mangler);
  let resultat = prepend ? fyll + tekst : tekst + fyll;
  printOut(resultat);

  return resultat;
}
expandText("Heisann", 10, "*", true);
expandText("Test test 1 2", 20, "_", false);
printOut(newLine);

printOut(
  "--- Part 9 ----------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function testMathExpression() {
  let current = 1;

  for (let line = 1; line <= 200; line++) {

    let leftCount = line;
    let rightCount = line - 1;

    let leftSum = 0;
    for (let i = 0; i < leftCount; i++) {
      leftSum += current;
      current++;
    }

    let rightSum = 0;
    for (let i = 0; i < rightCount; i++) {
      rightSum += current;
      current++;
    }

    if (leftSum !== rightSum) {
      printOut(`feil på linje ${line}: ${leftSum} != ${rightSum}`);
      return;
        
  }
}
  printOut("Maths fun!");
  printOut(newLine);
}
testMathExpression();
printOut(newLine);

/* Task 10*/
printOut(
  "--- Part 10 ---------------------------------------------------------------------------------------------"
);
/* Put your code below here!*/

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
let resultat = factorial(6);
printOut("6! = " + resultat);
printOut(newLine);