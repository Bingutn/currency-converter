import { useEffect, useState } from "react";
import "./styles.css";

// const host = `https://api.frankfurter.app/latest?amount={amount}&from={cur1}&to={cur2}`;
const host = `api.frankfurter.app`;

export default function App() {
  const [amount, setAmount] = useState(1);
  const [cur1, setCur1] = useState("THB");
  const [cur2, setCur2] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSwap() {
    const tempCurrency = cur1;
    setCur1(cur2);
    setCur2(tempCurrency);
  }

  useEffect(
    function () {
      async function converter() {
        setIsLoading(true);
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${cur1}&to=${cur2}`
        );

        const data = await res.json();
        setResult(data.rates[cur2]);
        setIsLoading(false);
      }

      if (cur1 === cur2) return setResult(amount);
      converter();
    },
    [amount, cur1, cur2]
  );

  return (
    <div className="container">
      <h1>CURRENCY CONVERTER</h1>
      <div className="content-box">
        <Amount amount={amount} setAmount={setAmount} />
        <Currency cur={cur1} setCur={setCur1} isLoading={isLoading} />
        <img
          src="swap.png"
          role="button"
          onClick={handleSwap}
          className="swap"
        />
        <Currency cur={cur2} setCur={setCur2} isLoading={isLoading} />
        <Result amount={amount} cur1={cur1} result={result} cur2={cur2} />
      </div>
    </div>
  );
}

function Amount({ amount, setAmount, isLoading }) {
  return (
    <div>
      <input
        className="box"
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </div>
  );
}

function Currency({ cur, setCur, isLoading }) {
  return (
    <div>
      <select
        className="box"
        value={cur}
        onChange={(e) => setCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="GBP">GBP</option>
        <option value="THB">THB</option>
        <option value="KRW">KRW</option>
        <option value="JPY">JPY</option>
        <option value="SGD">SGD</option>
        <option value="AUD">AUD</option>
      </select>
    </div>
  );
}

function Result({ result, amount, cur1, cur2 }) {
  return (
    <p>
      {amount} {cur1} ={" "}
      <span className="convert">
        {result} {cur2}
      </span>
    </p>
  );
}
