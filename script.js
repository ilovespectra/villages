document.addEventListener("DOMContentLoaded", async function () {
  // Define the public key of your wallet
  const publicKey = "4j2zhGEZuP8puTsSJMgwUnjafHcU1h2PUA1WNPnCipc5";
  
  // Define the token mint address (USDC mint address)
  const tokenMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  // Make the API request to fetch the balance
  const response = await fetch("https://old-weathered-snow.solana-mainnet.quiknode.pro/d83baa8fdaea9cbd48e4c5657bcf6e44238c0e05/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenAccountsByOwner",
      params: [
        publicKey,
        { mint: tokenMint },
        { encoding: "jsonParsed" },
      ],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const balance = data.result.value[0].account.data.parsed.info.tokenAmount.uiAmount;
  
    // Convert the balance to a string with 2 decimal places
    const formattedBalance = parseFloat(balance).toFixed(2);
  
    // Display the formatted balance in the "Funds Raised" section
    const fundsRaisedElement = document.getElementById("fundsRaised");
    if (fundsRaisedElement) {
      fundsRaisedElement.textContent = `$${formattedBalance}`; // Add the "$" symbol if needed
    }
  } else {
    console.error("Error fetching wallet balance:", response.status);
  }
});

