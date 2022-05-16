import { useEffect, useState } from "react";
import styles from "./Coin.module.css";

function App() {
  // loading
  const [loading, setLoading] = useState(true);
  // list
  const [coins, setCoins] = useState([]);

  // API
  // https://api.coinpaprika.com/v1/tickers
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  // USD -> BTC conversion
  const [usd, setUsd] = useState(0);
  const onChange = (event) => {
    setUsd(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>The Coins!</h1>
      <p>{loading ? "" : `Total coins : ${coins.length}`}</p>

      {loading ? (
        <strong>Loading ...</strong>
      ) : (
        <div>
          <div className={styles.box}>
            <h2>Coin List</h2>
            <select className={styles.sel}>
              {coins.map((coin) => (
                <option className={styles.option}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <span className={styles.arrow}></span>
          </div>

          <div className={styles.box}>
            <h2>Coin Converter</h2>
            <form>
              <h3>USD </h3>
              <input
                type="number"
                onChange={onChange}
                placeholder="USD"
                className={styles.usd}
              />
              &nbsp;$
              <br />
              <h3>Select Coin</h3>
              <select className={styles.sel}>
                {coins.map((coin) => (
                  <option className={styles.option}>
                    {coin.name} : {usd / coin.quotes.USD.price} {coin.symbol}
                  </option>
                ))}
              </select>
              <span className={styles.arrow}></span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
