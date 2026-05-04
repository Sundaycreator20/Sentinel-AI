const { ethers } = require("ethers");

async function startSentinel() {
    console.log("--- Elevate Sentinel: Local Market Intelligence ---");

    try {
        // 1. Fetch ETH Price in USD and NGN/USD Exchange Rate
        const [cryptoRes, forexRes] = await Promise.all([
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"),
            fetch("https://api.exchangerate-api.com/v4/latest/USD")
        ]);

        const cryptoData = await cryptoRes.json();
        const forexData = await forexRes.json();

        const ethPriceUSD = cryptoData.ethereum.usd;
        const exchangeRate = forexData.rates.NGN;
        const ethPriceNGN = ethPriceUSD * exchangeRate;

        console.log("MARKET STATUS: Connected");
        console.log(`LIVE ETH PRICE (USD): $${ethPriceUSD.toLocaleString()}`);
        console.log(`EXCHANGE RATE: ₦${exchangeRate.toFixed(2)} / $1`);
        console.log("------------------------------------------");
        console.log(`TOTAL VALUE (NGN): ₦${ethPriceNGN.toLocaleString()}`);
        console.log("------------------------------------------");
        
    } catch (error) {
        console.log("MARKET STATUS: Offline. Check data connection.");
    }
}

startSentinel();
