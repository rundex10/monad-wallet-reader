const API_KEY = "MASUKKAN_API_KEY_KAMU";
const BASE_URL = `https://monad-testnet.g.alchemy.com/v2/${API_KEY}`;

async function getWalletData() {
    const address = document.getElementById("address").value.trim();
    if (!address) {
        alert("Masukkan address dulu!");
        return;
    }

    // Tampilkan loading, sembunyikan hasil
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    try {
        // 1. Ambil Balance
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

        // 2. Dummy NFT count (ubah ke API asli jika ada)
        const nftCount = Math.floor(Math.random() * 10);

        // 3. Ambil Total TX Count
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

        // Delay untuk animasi tampil satu-satu
        setTimeout(() => {
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("result").classList.remove("hidden");

            showWithDelay("balance", balanceEth.toFixed(4), 0);
            showWithDelay("nfts", nftCount, 500);
            showWithDelay("tx", txCount, 1000);
        }, 1000);

    } catch (error) {
        console.error(error);
        alert("Gagal mengambil data wallet");
        document.getElementById("loading").classList.add("hidden");
    }
}

function showWithDelay(id, value, delay) {
    setTimeout(() => {
        document.getElementById(id).innerText = value;
        document.getElementById(`${id}-card`)?.classList.add("show");
    }, delay);
}
