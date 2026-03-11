const mediaQueue = {
    add: async (name, data) => {
        console.log(`[Mock Queue] Job added: ${name}`, data);
        // Simulating immediate processing for simplicity without valid Redis
        // In a real app this would go to Redis
        return Promise.resolve();
    }
};

module.exports = { mediaQueue };
