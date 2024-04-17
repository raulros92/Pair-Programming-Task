/* POTENTIAL SCENARIOS
1. Boundary Cases: Ensure your code handles edge cases such as the minimum and maximum purchase prices, as well as prices exactly at the thresholds between rate bands.
2. Negative Values: Check how your code handles negative purchase prices.
3. Invalid Inputs: Consider how your code behaves when given non-numeric inputs or other invalid data types.
4. Accuracy: Verify the accuracy of your calculations against known LBTT values for specific purchase prices.
5. Refactoring: Be prepared to discuss potential refactoring opportunities to improve code readability, maintainability, or performance.
6. Error Handling: Discuss how your code handles potential errors or unexpected scenarios gracefully, such as out-of-range values.
7. Test Coverage: Ensure that your unit tests cover various scenarios and adequately test the behavior of your code.
8. Scalability: Consider how your solution might scale if additional rate bands or complex tax rules were introduced in the future.
9. Code Structure: Be ready to explain your code structure and the rationale behind your design decisions, including the use of switch statements and helper functions.
10. Discussion Points: Prepare to discuss the reasoning behind assumptions made in the code, such as the simplified LBTT calculation assumptions provided in the exercise.
*/

// Purchase price
//const purchasePrice = 875000;

// Array of rate bands and tax rates
const rateBands = [
    { threshold: 0, rate: 0 },  // Up to £145,000: 0%
    { threshold: 145000, rate: 0.02 },  // £145,001 to £250,000: 2%
    { threshold: 250000, rate: 0.05 },  // £250,001 to £325,000: 5%
    { threshold: 325000, rate: 0.1 },   // £325,001 to £750,000: 10%
    { threshold: 750000, rate: 0.12 }   // Over £750,000: 12%
];

function calculateLBTT(purchasePrice) {
    let totalLBTT = 0;

    switch (true) {
        case (purchasePrice > 750000):
            // Over £750,000
            totalLBTT = calculateTax(rateBands[4], purchasePrice);
            break;
        case (purchasePrice > 325000):
            // £325,001 to £750,000
            totalLBTT = calculateTax(rateBands[3], purchasePrice);
            break;
        case (purchasePrice > 250000):
            // £250,001 to £325,000
            totalLBTT = calculateTax(rateBands[2], purchasePrice);
            break;
        case (purchasePrice > 145000):
            // £145,001 to £250,000
            totalLBTT = calculateTax(rateBands[1], purchasePrice);
            break;
        default:
            // Below £145,000
            totalLBTT = 0;
    }

    return totalLBTT;

    function calculateTax(band, price) {
        const taxableAmount = price - band.threshold;
        let tax = taxableAmount * band.rate;
        for (let i = 0; i < rateBands.indexOf(band); i++) {
            const bandTaxableAmount = Math.max(0, Math.min(price, rateBands[i + 1].threshold) - rateBands[i].threshold);
            tax += bandTaxableAmount * rateBands[i].rate;
        }
        return tax;
    }
}

//test using Jest.
module.exports = calculateLBTT;

//test using console.log
//const purchasePrice = 875000;
//console.log("Total LBTT for £" + purchasePrice + " purchase price: £" + totalLBTT);