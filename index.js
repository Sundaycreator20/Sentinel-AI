const { ethers } = require("ethers");

async function startSentinel() {
    console.log("--- Elevate Sentinel: Generating Identity ---");

    // 1. Create a random wallet
    const wallet = ethers.Wallet.createRandom();
    
    console.log("SENTINEL ADDRESS: " + wallet.address);
    console.log("PRIVATE KEY: " + wallet.privateKey);
    console.log("------------------------------------------");

    // 2. Connect to the network
    const provider = new ethers.JsonRpcProvider("https://rpc.flashbots.net");

    try {
        const block = await provider.getBlockNumber();
        console.log("CONNECTION: Live");
        console.log("CURRENT BLOCK: " + block);
    } catch (error) {
        console.log("CONNECTION: Failed. Check internet.");
    }
}

startSentinel();
