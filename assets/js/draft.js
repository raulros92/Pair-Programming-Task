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

    // Initialise total LBTT to 0
    let totalLBTT = 0;

    if (purchasePrice > 145000 && purchasePrice <= 250000) {
        // Calculate the taxable amount for the forth band.
        const taxableAmount = purchasePrice - rateBands[rateBands.length - 4].threshold;
        // Calculate the tax for the forth band.
        const tax = taxableAmount * rateBands[rateBands.length - 4].rate;
        // Add the tax to the total LBTT
        totalLBTT += tax;
        // Calculate and add the tax for the other bands
        for (let i = 0; i < rateBands.length - 4; i++) {
            // Calculate the taxable amount for the current band
            const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);

            // Calculate the tax for the current band
            const bandTax = bandTaxableAmount * rateBands[i].rate;

            // Add the tax to the total LBTT
            totalLBTT += bandTax;
        }

    }

    if (purchasePrice > 250000 && purchasePrice <= 325000) {
        // Calculate the taxable amount for the forth band.
        const taxableAmount = purchasePrice - rateBands[rateBands.length - 3].threshold;
        // Calculate the tax for the forth band.
        const tax = taxableAmount * rateBands[rateBands.length - 3].rate;
        // Add the tax to the total LBTT
        totalLBTT += tax;
        // Calculate and add the tax for the other bands
        for (let i = 0; i < rateBands.length - 3; i++) {
            // Calculate the taxable amount for the current band
            const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);

            // Calculate the tax for the current band
            const bandTax = bandTaxableAmount * rateBands[i].rate;

            // Add the tax to the total LBTT
            totalLBTT += bandTax;
        }

    }

    if (purchasePrice > 325000 && purchasePrice <= 750000) {
        // Calculate the taxable amount for the forth band.
        const taxableAmount = purchasePrice - rateBands[rateBands.length - 2].threshold;
        // Calculate the tax for the forth band.
        const tax = taxableAmount * rateBands[rateBands.length - 2].rate;
        // Add the tax to the total LBTT
        totalLBTT += tax;
        // Calculate and add the tax for the other bands
        for (let i = 0; i < rateBands.length - 2; i++) {
            // Calculate the taxable amount for the current band
            const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);

            // Calculate the tax for the current band
            const bandTax = bandTaxableAmount * rateBands[i].rate;

            // Add the tax to the total LBTT
            totalLBTT += bandTax;
        }

    }

    if (purchasePrice > 750000) {
        // Calculate the taxable amount for the last band.
        const taxableAmount = purchasePrice - rateBands[rateBands.length - 1].threshold;

        // Calculate the tax for the last band
        const tax = taxableAmount * rateBands[rateBands.length - 1].rate;

        // Add the tax to the total LBTT
        totalLBTT += tax;

        // Calculate and add the tax for the other bands
        for (let i = 0; i < rateBands.length - 1; i++) {
            // Calculate the taxable amount for the current band
            const bandTaxableAmount = Math.max(0, Math.min(purchasePrice, rateBands[i + 1].threshold) - rateBands[i].threshold);

            // Calculate the tax for the current band
            const bandTax = bandTaxableAmount * rateBands[i].rate;

            // Add the tax to the total LBTT
            totalLBTT += bandTax;
        }
    }

    return totalLBTT;

}

//test using Jest.
module.exports = calculateLBTT;

//test using console.log
//console.log("Total LBTT for £" + purchasePrice + " purchase price: £" + totalLBTT);