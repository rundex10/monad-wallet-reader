const API_KEY = "P9QADugjmL2Ib2ivnLv_j";
const BASE_URL = `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`; // ganti dengan network yang sesuai

async function checkWallet() {
    const address = document.getElementById("walletAddress").value.trim();
    const loading = document.getElementById("loading");
    const results = document.getElementById("results");

    if (!address) {
        alert("Masukkan alamat wallet!");
        return;
    }

    // Tampilkan loading, sembunyikan hasil
    loading.style.display = "block";
    results.style.display = "none";

    try {
        // Ambil Balance
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

        // Ambil Total Transactions
        const txRes = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 2,
                method: "eth_getTransactionCount",
                params: [address, "latest"]
            })
        });
        const txData = await txRes.json();
        const totalTx = parseInt(txData.result, 16);

        // Update hasil dengan animasi delay
        document.getElementById("balance").textContent = balanceEth.toFixed(4) + " ETH";
        await new Promise(r => setTimeout(r, 400));
        document.getElementById("transactions").textContent = totalTx;

        // Tampilkan hasil
        loading.style.display = "none";
        results.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil data wallet.");
        loading.style.display = "none";
    }
}
