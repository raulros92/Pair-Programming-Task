// Array of rate bands and tax rates for the first house
const rateBandsFirstHouse = [
    { threshold: 0, rate: 0 },  // Up to £145,000: 0%
    { threshold: 145000, rate: 0.02 },  // £145,001 to £250,000: 2%
    { threshold: 250000, rate: 0.05 },  // £250,001 to £325,000: 5%
    { threshold: 325000, rate: 0.1 },   // £325,001 to £750,000: 10%
    { threshold: 750000, rate: 0.12 }   // Over £750,000: 12%
];

// Array of rate bands and tax rates for the second house (10% higher)
const rateBandsSecondHouse = rateBandsFirstHouse.map(function (band) {
    return { ...band, rate: band.rate * 1.1 };
});

function calculateLBTT(purchasePrice, isFirstHouse) {
    const rateBands = isFirstHouse ? rateBandsFirstHouse : rateBandsSecondHouse;

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

// Test cases
console.log("Total LBTT for first house: £" + calculateLBTT(255000, true)); // First house purchase
console.log("Total LBTT for second house: £" + calculateLBTT(420000, false)); // Second house purchase