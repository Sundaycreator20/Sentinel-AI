// Function to load the TradingView Chart
function loadChart(symbol, name) {
    document.getElementById('chart-title').innerText = `Market Chart: ${name}`;
    new TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": `BINANCE:${symbol}USDT`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "save_image": false,
        "container_id": "tradingview_widget"
    });
}

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
            { id: 'bitcoin', symbol: 'BTC', name: "Bitcoin", usd: cryptoData.bitcoin.usd },
            { id: 'ethereum', symbol: 'ETH', name: "Ethereum", usd: cryptoData.ethereum.usd },
            { id: 'solana', symbol: 'SOL', name: "Solana", usd: cryptoData.solana.usd }
        ];

        container.innerHTML = ''; 

        assets.forEach(asset => {
            const ngnPrice = (asset.usd * rate).toLocaleString();
            const card = document.createElement('div');
            card.className = 'card clickable';
            card.innerHTML = `
                <h3>${asset.name} (${asset.symbol})</h3>
                <div class="price-usd">$${asset.usd.toLocaleString()}</div>
                <div class="price-ngn">₦${ngnPrice}</div>
            `;
            // Make the card clickable to change the chart
            card.onclick = () => loadChart(asset.symbol, asset.name);
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p style="color:red">Connection lost.</p>';
    }
}

// Start everything
updateDashboard();
loadChart('BTC', 'Bitcoin'); // Load BTC by default
