const API_KEY = "P9QADugjmL2Ib2ivnLv_j";
const BASE_URL = `https://monad-testnet.g.alchemy.com/v2/${API_KEY}`;

async function getWalletData() {
    const address = document.getElementById("address").value.trim();
    if (!address) {
        alert("Masukkan address dulu!");
        return;
    }

    try {
        
        const balanceRes = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBalance",
                params: [address, "latest"]
            })
        });
        const balanceData = await balanceRes.json();
        const balanceEth = parseInt(balanceData.result, 16) / 1e18;
        document.getElementById("balance").innerText = balanceEth.toFixed(4);

        const nftCount = Math.floor(Math.random() * 10);
        document.getElementById("nfts").innerText = nftCount;

        const txRes = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getTransactionCount",
                params: [address, "latest"]
            })
        });
        const txData = await txRes.json();
        const txCount = parseInt(txData.result, 16);
        document.getElementById("tx").innerText = txCount;

    } catch (error) {
        console.error(error);
        alert("Gagal mengambil data wallet");
    }
}
