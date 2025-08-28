"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

// --- Part 1, 2, 3 ----------------------------------------------------------------------------------------
printOut("--- Part 1, 2, 3 ----------------------------------------------------------------------------------------");
printOut(newLine);

// Part 1
let wakeUpTime = 7;
if (wakeUpTime === 7) {
    printOut("Part 1: Jeg kan ta bussen til skolen.");
} else {
    printOut("Part 1: Jeg kan ikke ta bussen til skolen.");
}
printOut(newLine);
printOut(newLine);

// Part 2
wakeUpTime = 6; // Test 6, 7 og 8
if (wakeUpTime === 7) {
    printOut("Part 2: Jeg kan ta bussen til skolen.");
} else {
    printOut("Part 2: Jeg må ta bilen til skolen.");
}
printOut(newLine);
printOut(newLine);

// Part 3
wakeUpTime = 8; // Test 7 og 8
if (wakeUpTime === 7) {
    printOut("Part 3: Jeg kan ta bussen til skolen.");
} else if (wakeUpTime === 8) {
    printOut("Part 3: Jeg kan ta toget til skolen.");
} else {
    printOut("Part 3: Jeg må ta bilen til skolen.");
}
printOut(newLine);
printOut(newLine);

// --- Part 4, 5 --------------------------------------------------------------------------------------------
printOut("--- Part 4, 5 --------------------------------------------------------------------------------------------");
printOut(newLine);

let number = 0; // Test positive, negative, zero

// Part 4
if (number > 0) {
    printOut("Part 4: Tallet er positivt.");
} else {
    printOut("Part 4: Tallet er negativt.");
}
printOut(newLine);
printOut(newLine);

// Part 5
if (number > 0) {
    printOut("Part 5: Tallet er positivt.");
} else if (number < 0) {
    printOut("Part 5: Tallet er negativt.");
} else {
    printOut("Part 5: Tallet er null.");
}
printOut(newLine);
printOut(newLine);

// --- Part 6 ----------------------------------------------------------------------------------------------
printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
printOut(newLine);

let imageSize = Math.floor(Math.random() * 8) + 1; // 1 til 8 MP
printOut(`Part 6: Bildet er ${imageSize}MP.`);
if (imageSize >= 4) {
    printOut(" Takk, bildet kan brukes.");
} else {
    printOut(" Bildet er for lite.");
}
printOut(newLine);
printOut(newLine);

// --- Part 7 ----------------------------------------------------------------------------------------------
printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
printOut(newLine);

if (imageSize >= 6) {
    printOut("Part 7: Bildet er for stort.");
} else if (imageSize >= 4) {
    printOut("Part 7: Bildet kan brukes.");
} else {
    printOut("Part 7: Bildet er for lite.");
}
printOut(newLine);
printOut(newLine);

// --- Part 8 ----------------------------------------------------------------------------------------------
printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
printOut(newLine);

const monthList = ["January", "February", "Mars", "April", "Mai", "Jun", "Juli", "August", "September", "October", "November", "December"];
const noOfMonth = monthList.length;
const monthName = monthList[Math.floor(Math.random() * noOfMonth)];

if (monthName.toLowerCase().includes("r")) {
    printOut(`Part 8: Måneden er ${monthName}. Du må ta vitamin D.`);
} else {
    printOut(`Part 8: Måneden er ${monthName}. Du trenger ikke ta vitamin D.`);
}
printOut(newLine);
printOut(newLine);

// --- Part 9 ----------------------------------------------------------------------------------------------
printOut("--- Part 9 ----------------------------------------------------------------------------------------------");
printOut(newLine);

let daysInMonth;
switch(monthName) {
    case "January": case "Mars": case "May": case "July": case "August": case "October": case "December":
        daysInMonth = 31;
        break;
    case "April": case "June": case "September": case "November":
        daysInMonth = 30;
        break;
    case "February":
        daysInMonth = 28; // Ikke skuddår
        break;
    default:
        daysInMonth = 30;
}
printOut(`Part 9: Måneden ${monthName} har ${daysInMonth} dager.`);
printOut(newLine);
printOut(newLine);

// --- Part 10 ---------------------------------------------------------------------------------------------
printOut("--- Part 10 ---------------------------------------------------------------------------------------------");
printOut(newLine);

if (["March", "May"].includes(monthName)) {
    printOut(`Part 10: Galleri er stengt i ${monthName}.`);
} else if (monthName === "April") {
    printOut(`Part 10: Galleri er midlertidig åpent i ${monthName}.`);
} else {
    printOut(`Part 10: Galleri er åpent i ${monthName}.`);
}
printOut(newLine);
printOut(newLine);
