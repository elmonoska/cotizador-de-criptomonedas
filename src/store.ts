import { create } from "zustand";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
  cryptoPrice: CryptoPrice | null;
  isLoadingCrypto: boolean;
  isLoadingCryptoPrice: boolean;
}

export const useCryptoStore = create<CryptoStore>()(devtools((set, get) => ({
  cryptoCurrencies: [],
  cryptoPrice: null,
  isLoadingCrypto: false,
  isLoadingCryptoPrice: false,
  
  // funcion para obtener el listado de criptomonedas
  fetchCryptos: async () => {
    set(() => ({isLoadingCrypto: true}));
    try {
      const cryptoCurrencies = await getCryptos()
      set(() => ({cryptoCurrencies}))
    } catch (error) {
      console.error(error)
    } finally {
      set(() => ({isLoadingCrypto: false}));
    }
  },

  // funcion para obtener el precio de una criptomoneda
  fetchData: async (pair) => {
    set(() => ({isLoadingCryptoPrice: true}));
    try {
      const cryptoPrice = await fetchCurrentCryptoPrice(pair);

      // obtener la imagen de la criptomoneda buscando en la lista de criptos
      const findCrypto = get().cryptoCurrencies.find(crypto => crypto.SYMBOL === pair.criptocurrency);
      cryptoPrice.IMAGE_URL = findCrypto?.LOGO_URL ?? '';

      set(() => ({cryptoPrice}))
    } catch (error) {
      console.error(error)
    } finally {
      set(() => ({isLoadingCryptoPrice: false}));
    }
  }
})))
