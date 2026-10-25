import { useCryptoStore } from "../store"
import { formatDate } from "../utils";

export default function CryptoPriceDisplay() {
  const cryptoPrice = useCryptoStore(state => state.cryptoPrice);
  return (
    <>
      <div className="cripto-wrapper">
        <h2 className="capitalize">cotizacion</h2>
        <div className="">
          <div className="cripto-price">
            <img src={`${cryptoPrice?.IMAGE_URL}`} alt="imagen criptomoneda" loading="lazy" />
            <div>
              <p>el precio es de: <span>{cryptoPrice?.VALUE}</span></p>
              <p>precio mas alto del dia: <span>{cryptoPrice?.MOVING_24_HOUR_HIGH}</span></p>
              <p>precio mas bajo del dia: <span>{cryptoPrice?.MOVING_24_HOUR_LOW}</span></p>
              <p>variacion ultimas 24 horas: <span>{cryptoPrice?.MOVING_24_HOUR_CHANGE_PERCENTAGE}</span></p>
              <p>ultima actualizacion: <span>{formatDate(cryptoPrice?.VALUE_LAST_UPDATE_TS ?? 0)}</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
