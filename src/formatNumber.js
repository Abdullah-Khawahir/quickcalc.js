export function formatNumber(num, decimal) {
    // For very small numbers, ensure they stay in scientific notation
    if (Math.abs(num) < 1e-6 && num !== 0) {
        return num.toExponential();
    }

    // For very large numbers, avoid floating-point precision issues
    let roundedNum = Number(num.toFixed(decimal));
    if (roundedNum === 0 && num !== 0) {
        // Handle very small numbers by keeping them in scientific notation
        return num.toExponential(decimal);
    }

    return roundedNum;
}

