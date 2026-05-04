async function updateDashboard() {
    const container = document.getElementById('market-cards');

    try {
        const [cryptoRes, forexRes] = await Promise.all([
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"),
            fetch("https://api.exchangerate-api.com/v4/latest/USD")
        ]);

        const cryptoData = await cryptoRes.json();
        const rate = (await forexRes.json()).rates.NGN;

        const assets = [
            { id: 'bitcoin', name: "Bitcoin (BTC)", usd: cryptoData.bitcoin.usd },
            { id: 'ethereum', name: "Ethereum (ETH)", usd: cryptoData.ethereum.usd },
            { id: 'solana', name: "Solana (SOL)", usd: cryptoData.solana.usd }
        ];

        container.innerHTML = ''; // Clear loading text

        assets.forEach(asset => {
            const ngnPrice = (asset.usd * rate).toLocaleString();
            container.innerHTML += `
                <div class="card">
                    <h3>${asset.name}</h3>
                    <div class="price-usd">$${asset.usd.toLocaleString()}</div>
                    <div class="price-ngn">₦${ngnPrice}</div>
                </div>
            `;
        });

    } catch (error) {
        container.innerHTML = '<p style="color:red">Failed to connect to markets.</p>';
    }
}

updateDashboard();
// Update every 60 seconds
setInterval(updateDashboard, 60000);
