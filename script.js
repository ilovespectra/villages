document.addEventListener("DOMContentLoaded", async function () {

  const publicKey = PUBKEY;
  const tokenMint = MINT;
  const apiEndpoint = API_ENDPOINT;

  // Make the API request to fetch the balance
  const response = await fetch(apiEndpoint, {
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
    const balance = data.result.value[0].account.data.parsed.info.tokenAmount.uiAmountString;
    
    // Display the balance in the "Funds Raised" section
    const fundsRaisedElement = document.getElementById("fundsRaised");
    if (fundsRaisedElement) {
      fundsRaisedElement.textContent = balance;
    }
  } else {
    console.error("Error fetching wallet balance:", response.status);
  }
});

