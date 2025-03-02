function calculateExp(level) {
    if (level < 1) return 0; // Ensure level starts at 1

    const maxExp = 100; // Cap EXP per level
    const minExp = 10; // Minimum EXP gain per task
    const decayRate = 0.9; // EXP per task decreases by 10% per level

    // EXP formula: Starts high and gradually decreases
    let expGain = maxExp * Math.pow(decayRate, level - 1);

    // Ensure a minimum EXP gain
    return Math.max(Math.floor(expGain), minExp);
}

module.exports = { calculateExp };