import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

const initialPair : Pair = {currency: "", criptocurrency: ""}

export default function CriptoSearchForm() {
  const [pair, setPair] = useState<Pair>(initialPair);
  const [error, setError] = useState("");

  const cryptoCurrencies = useCryptoStore(state => state.cryptoCurrencies);
  const fetchData = useCryptoStore(state => state.fetchData);
  const isLoadingCryptoPrice = useCryptoStore(state => state.isLoadingCryptoPrice)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLSelectElement>) => setPair(prev => ({...prev, [e.target.name]: e.target.value}))
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(pair).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    fetchData(pair);
    setError("");
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="field">
          <label htmlFor="currency" className="capitalize">
            moneda:{" "}
          </label>
          <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
            <option value="" className="capitalize">
              --- Seleccione ---
            </option>
            {currencies.map((currency) => (
              <option value={currency.code} key={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="criptocurrency" className="capitalize">
            criptomoneda:{" "}
          </label>
          <select name="criptocurrency" id="criptocurrency" onChange={handleChange} value={pair.criptocurrency}>
            <option value="" className="capitalize">
              --- Seleccione ---
            </option>
            {cryptoCurrencies.map(cryptoCurrency => (
              <option value={cryptoCurrency.SYMBOL} key={cryptoCurrency.SYMBOL}>{cryptoCurrency.NAME}</option>
            ))}
          </select>
        </div>

        <input type="submit" value={isLoadingCryptoPrice ? "cotizando..." : "cotizar"} className="" disabled={isLoadingCryptoPrice} />
      </form>
    </>
  );
}
