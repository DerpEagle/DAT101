"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";


printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

// Original uttrykk
let expr1 = 2 + 3 * 2 - 4 * 6;

// Uttrykk med parenteser
let expr2 = 2 + 3 * (2 - 4) * 6;

printOut("Original expression: 2 + 3 * 2 - 4 * 6 = " + expr1);

printOut("Uttrykk med parenteser: 2 + 3 * (2 - 4) * 6 = " + expr2);

printOut(newLine);



printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let totalMM = 25 * 1000 + 34 * 10; // 25m og 34cm til millimeter

let inches = totalMM / 25.4;

printOut("25 meter og 34 cm = " + inches.toFixed(2) + "inches");

printOut(newLine);



printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let totalMinutes = (3 * 24 * 60) + (12 * 60) + 14 + (45 / 60);

printOut("3 dager, 12 timer, 14 minutter og 45 sekunder = " + totalMinutes.toFixed(2) + " minutter");

printOut(newLine);



printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let totalSec = 6322.52 * 60;

let days = Math.floor(totalSec / (24 * 3600));

totalSec %= (24 * 3600);

let hours = Math.floor(totalSec / 3600);

totalSec %= 3600;

let minutes = Math.floor(totalSec / 60);

let seconds = Math.floor(totalSec % 60);

printOut("6322.52 minutter = " + days + " dager, " + hours + " timer, " + minutes + " minutter og " + seconds + " sekunder");

printOut(newLine);



printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let rateNOK = 76;

let rateUSD = 8.6;

let usdToNok = Math.round((54 / rateUSD) * rateNOK);

let nokToUsd = Math.round((54 / rateNOK) * rateUSD);

printOut("54 Dollar = " + usdToNok + " Kroner ");

printOut("54 Kroner = " + nokToUsd + " Dollar ")

printOut(newLine);



printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let text = "There is much between heaven and earth that we do not understand.";

printOut("Antall tegn: " + text.length);

printOut("Tegn på posisjon 19: " + text.charAt(19));

printOut("Fra posisjon 35, 8 tegn: " + text.substr(35, 8));

printOut("Index for 'earth': " + text.indexOf("earth"));

printOut(newLine);



printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

printOut("5 > 3 = " + (5 > 3));

printOut("7 > = 7 = " + (7 >= 7));

printOut("'a' > 'b' = " + ('a' > 'b'));

printOut("'1' < 'a' = " + ('1' < 'a'));

printOut("'2500' < 'abcd' = " + ('2500' < 'abcd'));

printOut("'arne' ! = 'thomas' = " + ('arne' != 'thomas'));

printOut("(2 == 5) = " + (2 == 5));

printOut("('abcd' > 'bcd') = " + ('abcd' > 'bcd'));

printOut(newLine);



printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

printOut('"254" -> ' + Number("254"));

printOut('"57.23" -> ' + Number("57.23"));

printOut('"25 kroner" -> ' + parseInt("25 kroner"));

printOut(newLine);



printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let r = Math.floor(Math.random() * 360) + 1;

printOut("Tilfeldig tall = " + r);

printOut(newLine);



/* Task 10*/
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let weeks = Math.floor(131 / 7);

let daysLeft = 131 % 7;

printOut("131 dager = " + weeks + " uker og " + daysLeft + " dager");

printOut(newLine);