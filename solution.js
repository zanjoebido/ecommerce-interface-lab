/*LABORATORY 4*/

/**
 * PROBLEM 1: The Strict Type Checker
 * @param {*} 
 * @returns {string} 
 */
function checkVariable(input) {
    if (input === null) {
        return "object";
    }

    switch (typeof input) {
        case "string":
            return "string";
        case "number":
            return "number";
        case "boolean":
            return "boolean";
        case "bigint":
            return "bigint";
        case "undefined":
            return "undefined";
        case "object":
            return "object";
        default:
            return "unknown";
    }
}

/**
 * PROBLEM 2: Secure ID Generator
 * @param {number}
 * @returns {string[]} 
 */
function generateIDs(count) {
    const idArray = [];
    
    for (let n = 0; n < count; n++) {
        if (n === 5) {
            continue;
        }
        idArray.push(`ID-${n}`);
    }
    
    return idArray;
}

/**
 * PROBLEM 3: The Functional Sum
 * @param {...*} 
 * @returns {number} 
 * @throws {TypeError} 
 */
function calculateTotal(...numbers) {
    return numbers.reduce((accumulator, currentElement) => {
        if (typeof currentElement !== "number" || Number.isNaN(currentElement)) {
            throw new TypeError("Invalid input: All arguments must be numbers");
        }
        return accumulator + currentElement;
    }, 0);
}

/**
 * PROBLEM 4: Leaderboard Filter
 * @param {Object[]} 
 * @returns {string}
 */
function getTopScorers(playerList) {
    return playerList
        .filter(player => player.score > 8) 
        .map(player => player.name)        
        .join(", ");                        
}

/* PROBLEM 5: The Private Inventory*/
class Item {
    #discount = 0.1;

    /**
     * @param {string}
     * @param {number}
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    /**
     * @returns {number}
     */
    get finalPrice() {
        return this.price - (this.price * this.#discount);
    }
}

// /**
//  * PROBLEM 6: Robust Division
 
//  * @param {number}
//  * @param {number} 
//  * @returns {number|string}
//  */
// function safeDivide(a, b) {
//     try {
//         if (b === 0) {
//             throw new Error("Cannot divide by zero");
//         }
//         return a / b;
//     } catch (error) {
//         return error.message;
//     } finally {
//         console.log("Operation attempted");
//     }
// }

// console.log("STARTING TEST SCRIPTS\n");

// console.log("P1 (String):", checkVariable("Margaux Suite")); 
// console.log("P1 (Null):", checkVariable(null));           
// console.log("P1 (Undefined):", checkVariable(undefined));   

// console.log("\nP2 (Count 7):", generateIDs(7)); 

// try {
//     console.log("\nP3 (Valid Sum):", calculateTotal(10, 20, 30.5));
//     calculateTotal(10, "broken-string", 30); 
// } catch (e) {
//     console.log("P3 (Caught Error):", e.message); 
// }

// const extendedLeaderboard = [
//     { name: "Alice", score: 10 },
//     { name: "Bob", score: 5 },
//     { name: "Charlie", score: 12 },
//     { name: "Diana", score: 7 },
//     { name: "Ethan", score: 9 }
// ];
// console.log("\nP4 (Top Scorers):", getTopScorers(extendedLeaderboard)); 

// const testItem = new Item("Premium Jacket", 1000);
// console.log("\nP5 (Item Name):", testItem.name);           
// console.log("P5 (Discounted Price):", testItem.finalPrice);

// console.log("\nP6 (Valid Division):", safeDivide(10, 2));   
// console.log("P6 (Zero Division):", safeDivide(10, 0));    