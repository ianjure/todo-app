function calculateExp(level) {
    // Check if level is less than 1
    if (level < 1) return 0;

    // Constants
    const maxExp = 100; // Cap EXP per level
    const minExp = 10; // Minimum EXP gain per task
    const decayRate = 0.9; // EXP per task decreases by 10% per level

    // Calculate EXP gain
    let expGain = maxExp * Math.pow(decayRate, level - 1);

    // Return the maximum of the calculated EXP gain and the minimum EXP
    return Math.max(Math.floor(expGain), minExp);
}

module.exports = calculateExp;