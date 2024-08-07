class CooldownManager {
    constructor() {
        this.cooldowns = new Map();
        this.COOLDOWN_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
    }

    isOnCooldown(userId) {
        const now = Date.now();
        const cooldownEnd = this.cooldowns.get(userId);
        if (cooldownEnd && now < cooldownEnd) {
            const timeLeft = Math.ceil((cooldownEnd - now) / 1000);
            return timeLeft;
        }
        return false;
    }

    setCooldown(userId) {
        const now = Date.now();
        this.cooldowns.set(userId, now + this.COOLDOWN_TIME);
    }


    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
    
        // Pad minutes and seconds with leading zeros if necessary
        const paddedMinutes = String(minutes).padStart(1, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    
        return `**${paddedMinutes}m** **${paddedSeconds}s** `;
    }
}

module.exports = new CooldownManager();