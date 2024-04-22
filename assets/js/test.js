const calculateLBTT = require('./main');

test("Calculate LBTT for a purchase price over £750,000", () => {
    // Arrange: Define initial conditions
    const purchasePrice = 875000;
    // Act: Call the function we want to test
    const result = calculateLBTT(purchasePrice);
    // Assert: Verify the expected result
    expect(result).toBe(63350); // We expect the result to be 63350
});

test("Calculate LBTT for a purchase price between £325,001 and £750,000", () => {
    const purchasePrice = 500000;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(23350);
});

test("Calculate LBTT for a purchase price between £250,001 and £325,000", () => {
    const purchasePrice = 300000;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(4600);
});

test("Calculate LBTT for a purchase price between £145,001 and £250,000", () => {
    const purchasePrice = 235000;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(1800);
});

test("Calculate LBTT for a purchase price below £145,000", () => {
    const purchasePrice = 90000;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(0);
});

test("Calculate LBTT for £0 purchase price", () => {
    const purchasePrice = 0;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(0);
});

// Negative Values: Check how your code handles negative purchase prices.
test("Calculate LBTT for a negative purchase price", () => {
    const purchasePrice = -100000;
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(0);
});

//Invalid Inputs: Consider how your code behaves when given non-numeric inputs or other invalid data types.
test("Calculate LBTT for non-numeric input", () => {
    const purchasePrice = "not a number";
    const result = calculateLBTT(purchasePrice);
    expect(result).toBe(0); // It returns 0 for invalid input
});

/*
Rate Bands Template for Easy Calculation:
        { threshold: 0, rate: 0 }, //x to 145,000 = ?. 0% of ? = 0.
        { threshold: 145000, rate: 0.02 }, //£145,001 to £250,000 = £105,000. 2% of £105,000 = £2,100.
        { threshold: 250000, rate: 0.05 }, //£250,001 to £325,000 = £75,000. 5% of £75,000	= £3,750.
        { threshold: 325000, rate: 0.1 }, //£325,001 to £750,000 = £425,000. 10% of £425,000 = £42,500.
        { threshold: 750000, rate: 0.12 } // £750,001 to x = ?. 12% of ? = ???.
        Source: https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property#residential%20property%20rates%20and%20bands
*/

