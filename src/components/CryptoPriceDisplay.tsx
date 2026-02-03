import { useCryptoStore } from "../store"

export default function CryptoPriceDisplay() {
  const cryptoPrice = useCryptoStore(state => state.cryptoPrice);
  return (
    <>
      <div className="cripto-wrapper">
        <h2 className="capitalize">cotizacion</h2>
        <div className="">
          <div className="cripto-price">
            <img src={`https://www.cryptocompare.com/${cryptoPrice?.IMAGEURL}`} alt="imagen criptomoneda" loading="lazy" />
            <div>
              <p>el precio es de: <span>{cryptoPrice?.PRICE}</span></p>
              <p>precio mas alto del dia: <span>{cryptoPrice?.HIGHDAY}</span></p>
              <p>precio mas bajo del dia: <span>{cryptoPrice?.LOWDAY}</span></p>
              <p>variacion ultimas 24 horas: <span>{cryptoPrice?.CHANGEPCT24HOUR}</span></p>
              <p>ultima actualizacion: <span>{cryptoPrice?.LASTUPDATE}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
