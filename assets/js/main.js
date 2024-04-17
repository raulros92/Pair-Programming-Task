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
            // Calculate LBTT for purchase prices over £750,000
            const taxableAmount = purchasePrice - rateBands[rateBands.length - 1].threshold;
            totalLBTT += taxableAmount * rateBands[rateBands.length - 1].rate;
            // Calculate and add the tax for the other bands
            for (let i = 0; i < rateBands.length - 1; i++) {
                const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);
                const bandTax = bandTaxableAmount * rateBands[i].rate;
                totalLBTT += bandTax;
            }
            break;

        case (purchasePrice > 325000):
            // Calculate LBTT for purchase prices between £325,001 and £750,000
            const thirdBandTaxableAmount = purchasePrice - rateBands[rateBands.length - 2].threshold;
            totalLBTT += thirdBandTaxableAmount * rateBands[rateBands.length - 2].rate;
            // Calculate and add the tax for the other bands
            for (let i = 0; i < rateBands.length - 2; i++) {
                const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);
                const bandTax = bandTaxableAmount * rateBands[i].rate;
                totalLBTT += bandTax;
            }
            break;

        case (purchasePrice > 250000):
            // Calculate LBTT for purchase prices between £250,001 and £325,000
            const secondBandTaxableAmount = purchasePrice - rateBands[rateBands.length - 3].threshold;
            totalLBTT += secondBandTaxableAmount * rateBands[rateBands.length - 3].rate;
            // Calculate and add the tax for the other bands
            for (let i = 0; i < rateBands.length - 3; i++) {
                const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);
                const bandTax = bandTaxableAmount * rateBands[i].rate;
                totalLBTT += bandTax;
            }
            break;

        case (purchasePrice > 145000):
            // Calculate LBTT for purchase prices between £145,001 and £250,000
            const firstBandTaxableAmount = purchasePrice - rateBands[rateBands.length - 4].threshold;
            totalLBTT += firstBandTaxableAmount * rateBands[rateBands.length - 4].rate;
            // Calculate and add the tax for the other bands
            for (let i = 0; i < rateBands.length - 4; i++) {
                const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);
                const bandTax = bandTaxableAmount * rateBands[i].rate;
                totalLBTT += bandTax;
            }
            break;

        default:
            // For purchase prices below £145,000
            totalLBTT = 0;
    }

    return totalLBTT;
}


//test using Jest.
module.exports = calculateLBTT;

//test using console.log
//console.log("Total LBTT for £" + purchasePrice + " purchase price: £" + totalLBTT);