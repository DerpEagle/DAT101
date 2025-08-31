"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

//Telle opp fra 1 til 10
let line1 = "";
for (let i = 1; i <= 10; i++) line1 += i + " ";

//Telle ned fra 10 til 1
let line2 = "";
for (let i = 10; i >= 1; i--) line2 += i + " ";

printOut(line1);
printOut(line2);
printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let secretNumber = 45;
let guess = 0;
while (guess !== secretNumber) {
  guess = Math.floor(Math.random() * 60) + 1;
}

printOut("Gjettet tall er: " + guess);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let secretBig = 123456;
let guessBig = 0;
let attempts = 0;
let start = Date.now();
while (guessBig !== secretBig) {
    guessBig = Math.floor(Math.random() * 1000000) + 1;
    attempts++;
}
let elapsed = Date.now() - start;

printOut("Gjettet nummer: " + guessBig);
printOut("Forsøk " + attempts);
printOut("Tid brukt: " + elapsed + "ms");
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

let primes = "";
for (let num = 2; num < 200; num++) {
    let isPrime = true;
    let divisor = 2;

    while (divisor <= Math.sqrt(num)) {
        if (num % divisor === 0) {
            isPrime = false;
            break;
        }
        divisor++;
    }
    if (isPrime) primes += num + " ";
}
printOut("Primtall mellom 1 og 200: " + primes);
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

for (let row = 1; row <= 7; row++) {
  let line = "";
  for (let col = 1; col <= 9; col++) {
    line += "K" + col + "R" + row + " ";
  }
  printOut(line);
}
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function gradeFromPoints(points) {
    let percent = (points / 236) * 100;
    if (percent >= 89) return ", som er en A, og kan vise karakteren til bestemor for å få kake som belønning";
    if (percent >= 77) return ", som er en B, og kan være stolt av seg selv";
    if (percent >= 65) return ", som er en C, som er helt OK";
    if (percent >= 53) return ", som er en D, og burde øve litt mer";
    if (percent >= 41) return ", som er en E, og burde ta prøven på nytt";
    return ", som er en F, og må ta prøven på nytt";
}
for (let i =1; i <= 5; i++) {
    let score = Math.floor(Math.random() * 236) + 1;
    printOut("Student " + i + " fikk " + score + " poeng" + gradeFromPoints(score));
}
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

function rollDice() { return Math.floor(Math.random() * 6) + 1; }
function rollSixDice() {
  let dice = [];
  for (let i = 0; i < 6; i++) dice.push(rollDice());
  return dice;
}
function countValues(dice) {
  let counts = {};
  for (let d of dice) counts[d] = (counts[d] || 0) + 1;
  return counts;
}
function throwsUntil(condition) {
  let throws = 0;
  while (true) {
    throws++;
    let dice = rollSixDice();
    let counts = countValues(dice);
    let values = Object.keys(counts).map(Number);
    if (condition(dice, counts, values)) return throws;
  }
}
let straight = throwsUntil((d,c,v) => v.length === 6);
let threePairs = throwsUntil((d,c,v) => Object.values(c).filter(x => x===2).length===3);
let tower = throwsUntil((d,c,v) => Object.values(c).includes(4) && Object.values(c).includes(2));
let yahtzee = throwsUntil((d,c,v) => Object.values(c).includes(6));

printOut("Full straight (1-6): " + straight + " kast");
printOut("3 par: " + threePairs + " kast");
printOut("2 like og 4 like (tower): " + tower + " kast");
printOut("Yahtzee: " + yahtzee + " kast");
printOut(newLine);
