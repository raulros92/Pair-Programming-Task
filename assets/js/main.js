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

    for (let i = 0; i < rateBands.length; i++) {
        if (purchasePrice > rateBands[i].threshold) {
            totalLBTT = calculateTax(rateBands[i], purchasePrice);
        }
    }

    return totalLBTT;

    function calculateTax(band, price) {
        const taxableAmount = price - band.threshold;
        let tax = taxableAmount * band.rate;
        for (let i = 0; i < rateBands.indexOf(band); i++) {
            tax += singleBandCalculation(price, rateBands[i], rateBands[i + 1]);
        }
        return tax;
    }

    function singleBandCalculation(purchasePrice, rateBand, nextRateBand) {
        const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, nextRateBand.threshold) - rateBand.threshold);
        return bandTaxableAmount * rateBand.rate;
    }
}

//test using Jest.
module.exports = calculateLBTT;

//test using console.log
//const purchasePrice = 875000;
//console.log("Total LBTT for £" + purchasePrice + " purchase price: £" + totalLBTT);