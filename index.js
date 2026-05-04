const { ethers } = require("ethers");

async function startSentinel() {
    console.log("--- Elevate Sentinel: Multi-Asset Intelligence ---");

    try {
        // 1. Fetch Prices (BTC, ETH, SOL) and Forex (NGN)
        const [cryptoRes, forexRes] = await Promise.all([
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"),
            fetch("https://api.exchangerate-api.com/v4/latest/USD")
        ]);

        const cryptoData = await cryptoRes.json();
        const forexData = await forexRes.json();
        const rate = forexData.rates.NGN;

        // 2. Data Processing
        const assets = [
            { name: "Bitcoin", symbol: "BTC", usd: cryptoData.bitcoin.usd },
            { name: "Ethereum", symbol: "ETH", usd: cryptoData.ethereum.usd },
            { name: "Solana", symbol: "SOL", usd: cryptoData.solana.usd }
        ];

        console.log(`EXCHANGE RATE: ₦${rate.toFixed(2)} / $1`);
        console.log("------------------------------------------");

        assets.forEach(asset => {
            const priceNGN = asset.usd * rate;
            console.log(`${asset.name} (${asset.symbol}):`);
            console.log(` Price: $${asset.usd.toLocaleString()}`);
            console.log(` Local: ₦${priceNGN.toLocaleString()}`);
            console.log("---");
        });

    } catch (error) {
        console.log("MARKET STATUS: Offline. Check hotspot connection.");
    }
}

startSentinel();
