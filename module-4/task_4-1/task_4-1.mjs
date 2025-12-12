"use strict";
import { printOut, newLine } from "../../common/script/utils.mjs";

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const AccountType = {
    Normal: "Brukskonto",
    Saving: "Sparekonto",
    Credit: "Kreditkonto",
    Pension: "Pensionskonto"
};

printOut(Object.values(AccountType).join(", "));

printOut(newLine);

printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

class TAaccount {
    constructor(aType) {
        this.type = aType;
    }

    toString() {
        return this.type;
    }

    setType(aType) {
        const oldType = this.type;
        this.type = aType;
        printOut(`Konto er endret fra ${oldType} til ${aType}`);
    }
}

const myAccount = new TAaccount(AccountType.Normal);

printOut(`Min konto = ${myAccount.toString()}`);
myAccount.setType(AccountType.Saving);
printOut(`Min konto = ${myAccount.toString()}`);

printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

TAaccount.prototype.balance = 0;

TAaccount.prototype.getBalance = function() {
    return this.balance;
};

TAaccount.prototype.deposit = function(aAmount) {
    this.balance += aAmount;
    printOut(`Innskudd på ${aAmount}kr, ny saldo er ${this.balance}kr`);
};

TAaccount.prototype.withdraw = function(aAmount) {
    this.balance -= aAmount;
    printOut(`Uttak på ${aAmount}kr, ny saldo er ${this.balance}kr`);
};

myAccount.deposit(100);
myAccount.withdraw(25);
printOut(`Min saldo er ${myAccount.getBalance()}kr`);

printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

TAaccount.prototype.withdrawCount = 0;

TAaccount.prototype.setType = function(aType) {
    const oldType = this.type;
    this.type = aType;
    this.withdrawCount = 0; 
    printOut(`Konto er endret fra ${oldType} til ${aType}`);
};

TAaccount.prototype.withdraw = function(aAmount) {
    if (this.type === AccountType.Saving) {
        if (this.withdrawCount >= 3) {
            printOut("Du kan ikke ta ut penger fra en Sparekonto mer enn tre ganger!");
            return;
        }
        this.withdrawCount++;
        this.balance -= aAmount;
        printOut(`Uttak på ${aAmount}kr, ny saldo er ${this.balance}kr`);
        return;
    }

    if (this.type === AccountType.Pension) {
        printOut("Du kan ikke ta ut penger fra en Pensionskonto!");
        return;
    }

    this.balance -= aAmount;
    printOut(`Uttak på ${aAmount}kr, ny saldo er ${this.balance}kr`);
};

myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);

myAccount.setType(AccountType.Pension);
myAccount.withdraw(30);

myAccount.setType(AccountType.Saving);
myAccount.withdraw(10);

printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

const CurrencyTypes = {
    NOK: { value: 1.0000, name: "Norske kroner", denomination: "kr" },
    EUR: { value: 0.0985, name: "Europeiske euro", denomination: "€" },
    USD: { value: 0.1091, name: "United States dollar", denomination: "$" },
    GBP: { value: 0.0847, name: "Pound sterling", denomination: "£" },
    INR: { value: 7.8309, name: "Indiske rupee", denomination: "₹" },
    AUD: { value: 0.1581, name: "Australienske dollar", denomination: "A$" },
    PHP: { value: 6.5189, name: "Filippinske peso", denomination: "₱" },
    SEK: { value: 1.0580, name: "Svenske kroner", denomination: "kr" },
    CAD: { value: 0.1435, name: "Canadiske dollar", denomination: "C$" },
    THB: { value: 3.3289, name: "Thai baht", denomination: "฿" }
};

TAaccount.prototype.currencyType = "NOK";

TAaccount.prototype.setCurrencyType = function(aType) {
    if (this.currencyType === aType) return;
    this.currencyType = aType;
};

TAaccount.prototype.deposit = function(aAmount) {
    const denom = CurrencyTypes[this.currencyType].denomination;
    this.balance += aAmount;
    printOut(`Innskudd på ${aAmount}${denom}, ny saldo er ${this.balance}${denom}`);
};

myAccount.setCurrencyType("NOK");
myAccount.deposit(150);

printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/


TAaccount.prototype.currencyConvert = function(oldType, newType) {
    const oldVal = CurrencyTypes[oldType].value;
    const newVal = CurrencyTypes[newType].value;
    const converted = this.balance * (newVal / oldVal);
    return Number(converted.toFixed(2));
};

TAaccount.prototype.setCurrencyType = function(aType) {
    if (this.currencyType === aType) return;

    const oldType = this.currencyType;
    const newType = aType;

    printOut(`Kontovaluta er endret fra ${CurrencyTypes[oldType].name} til ${CurrencyTypes[newType].name}`);

    this.balance = this.currencyConvert(oldType, newType);
    this.currencyType = newType;

    const denom = CurrencyTypes[newType].denomination;
    printOut(`Ny saldo er ${this.balance}${denom}`);
};


myAccount.setCurrencyType("SEK");
myAccount.setCurrencyType("USD");
myAccount.setCurrencyType("NOK");

printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
/* Put your code below here!*/

TAaccount.prototype.deposit = function(aAmount, aType) {
    const txType = aType || "NOK";
    const txInfo = CurrencyTypes[txType];
    const accInfo = CurrencyTypes[this.currencyType];

    const amountInAccountCurrency = aAmount * (accInfo.value / txInfo.value);
    this.balance += amountInAccountCurrency;

    const amountStr = aAmount.toFixed(2);
    const balanceStr = this.balance.toFixed(2);

    printOut(
        `Innskudd på ${amountStr} ${txInfo.name}, ny saldo er ${balanceStr}${accInfo.denomination}`
    );
};

TAaccount.prototype.withdraw = function(aAmount, aType) {
    const txType = aType || "NOK";
    const txInfo = CurrencyTypes[txType];
    const accInfo = CurrencyTypes[this.currencyType];

    if (this.type === AccountType.Saving) {
        if (this.withdrawCount >= 3) {
            printOut("Du kan ikke ta ut penger fra en Sparekonto mer enn tre ganger!");
            return;
        }
        this.withdrawCount++;
    }

    if (this.type === AccountType.Pension) {
        printOut("Du kan ikke ta ut penger fra en Pensionskonto!");
        return;
    }

    const amountInAccountCurrency = aAmount * (accInfo.value / txInfo.value);
    this.balance -= amountInAccountCurrency;

    const amountStr = aAmount.toFixed(2);
    const balanceStr = this.balance.toFixed(2);

    printOut(
        `Uttak på ${amountStr} ${txInfo.name}, ny saldo er ${balanceStr}${accInfo.denomination}`
    );
};

// --- Task 7 test sequence ---

// Start i NOK (fra Part 6) og Sparekonto fra før
myAccount.setCurrencyType("NOK");

// 1) Deposit 12 USD
myAccount.deposit(12.0, "USD");

// 2) Withdraw 10 GBP
myAccount.withdraw(10.0, "GBP");

// 3) Bytt til CAD
myAccount.setCurrencyType("CAD");

// 4) Bytt til INR
myAccount.setCurrencyType("INR");

// 5) Ta ut resten av saldoen i en annen valuta enn kontoen (bruk SEK)
const accVal = CurrencyTypes["INR"].value;
const txVal = CurrencyTypes["SEK"].value;
const amountInSEK = Number((myAccount.getBalance() * (txVal / accVal)).toFixed(2));

myAccount.withdraw(amountInSEK, "SEK");





printOut(newLine);
