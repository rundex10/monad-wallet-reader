// netlify/functions/getData.js
const axios = require('axios');

exports.handler = async (event) => {
  const { address } = event.queryStringParameters;
  if (!address) {
    return { statusCode: 400, body: 'Address is required' };
  }

  const API_KEY = process.env.ALCHEMY_KEY;
  const RPC_URL = `https://monad-testnet.g.alchemy.com/v2/${API_KEY}`;

  try {
    // 1. Balance
    const balanceRes = await axios.post(RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getBalance',
      params: [address, 'latest']
    });
    const balanceWei = BigInt(balanceRes.data.result);
    const balanceMON = Number(balanceWei) / 1e18;

    // 2. Tx Count
    const txRes = await axios.post(RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionCount',
      params: [address, 'latest']
    });
    const txCount = parseInt(txRes.data.result, 16);

    const nftRes = await axios.get(`https://monad-testnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs?owner=${address}`);
    const nftCount = nftRes.data.ownedNfts ? nftRes.data.ownedNfts.length : 0;

    return {
      statusCode: 200,
      body: JSON.stringify({
        balance: balanceMON,
        txCount: txCount,
        nftCount: nftCount
      })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};

