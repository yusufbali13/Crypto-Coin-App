const input = document.getElementById("input");
const button = document.getElementById("button");
const coinList = document.querySelector(".coins");
const msgSpan = document.querySelector(".msg");
const coins = [];

const options = {
  headers: {
    "x-access-token":
      "coinrankinge7c7605e8ea1d82af3c6ee8840f087dea99668fc79456d84",
  },
};

async function getData(coinName) {
  try {
    const response = await fetch(
      `https://api.coinranking.com/v2/search-suggestions?query=${coinName}`,
      options
    );
    const data = await response.json();
    const coin = data.data.coins[0];
    for (let i = 0; i < coins.length; i++) {
      if (coins[i].symbol === coin.symbol) {
        msgSpan.textContent = `Already added to the List${input.value}`;
        return;
      }
    }
    coins.push(coin);
    writeDisplay(coin);
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    getData(input.value);
    input.value = "";
  }
});

function writeDisplay(currentCoin) {
  const coinElement = document.createElement("div");
  coinElement.classList.add("coin");
  coinElement.innerHTML = `
        <div>
            <img src=${currentCoin.iconUrl}>
        </div>
        <div>
            <h2>${currentCoin.name}</h2>
        </div>
        <div >
            <h3>${currentCoin.symbol}</h3>
        </div>
        <div>
            <p>$${Number(currentCoin.price).toFixed(2)}</p>
        </div>
        
    `;
  coinList.appendChild(coinElement);
}
//!! Fetch-Then yontemi
// const options = {
//     headers: {
//       'x-access-token': 'your-api-key',
//     },
//   };

//   fetch('https://api.coinranking.com/v2/search-suggestions?query=${coinName}', options)
//     .then((response) => response.json())
//     .then((result) => console.log(result));
