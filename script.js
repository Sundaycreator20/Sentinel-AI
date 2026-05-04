// Tab Switching Logic
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Market Data Logic (BTC, ETH, SOL)
async function updateMarket() {
    const container = document.getElementById('market-cards');
    try {
        const [cryptoRes, forexRes] = await Promise.all([
            fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"),
            fetch("https://api.exchangerate-api.com/v4/latest/USD")
        ]);

        const crypto = await cryptoRes.json();
        const rate = (await forexRes.json()).rates.NGN;

        const assets = [
            { name: "Bitcoin", sym: "BTC", usd: crypto.bitcoin.usd },
            { name: "Ethereum", sym: "ETH", usd: crypto.ethereum.usd },
            { name: "Solana", sym: "SOL", usd: crypto.solana.usd }
        ];

        container.innerHTML = '';
        assets.forEach(asset => {
            const ngn = (asset.usd * rate).toLocaleString();
            container.innerHTML += `
                <div class="card">
                    <small>${asset.sym} / NGN</small>
                    <h3>${asset.name}</h3>
                    <div class="price-ngn">₦${ngn}</div>
                    <div style="opacity:0.6">$${asset.usd.toLocaleString()}</div>
                </div>
            `;
        });
    } catch (e) {
        container.innerHTML = "Connecting to market nodes...";
    }
}

updateMarket();
setInterval(updateMarket, 60000); // Update every minute
