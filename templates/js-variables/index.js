// Vending machine program

// Variables representing the number of snacks
let chips = 15;
let candies = 20;
let drinks = 25;

// Variables representing the prices of snacks
let priceChips = 1.25;
let priceCandy = 1.75;
let priceSoda = 2.00;

// Welcome the user and ask what snack they want
console.log("Welcome to the JavaScript vending machine 🍬!\n");
// "\n" create a new line

console.log("We offer chips for: $" + priceChips);
console.log("chocolates for: $" + priceCandy);
console.log("and soda for: $" + priceSoda);

console.log("\nWhat kind of snack would you like?");

// Save what the user types as their selection in a variable named "choice"
let choice = prompt();

// Print a statement that includes the user's answer
console.log("\nYou've selected " + choice + "!");
console.log("Too bad JavaScript can't actually produce food.");