import { useEffect } from "react";
import CriptoSearchForm from "./components/CriptoSearchForm";
import { useCryptoStore } from "./store";
import CryptoPriceDisplay from "./components/CryptoPriceDisplay";
import Spinner from "./components/Spinner";

export default function App() {
  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos);
  const cryptoPrice = useCryptoStore(state => state.cryptoPrice);
  const isLoadingCryptoPrice = useCryptoStore(state => state.isLoadingCryptoPrice);

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          cotizador de <span>criptomonedas</span>
        </h1>

        <div className="content">
          <CriptoSearchForm />

          {isLoadingCryptoPrice && <Spinner />}
          {!isLoadingCryptoPrice && cryptoPrice && <CryptoPriceDisplay />}
        </div>
      </div>
    </>
  );
}
