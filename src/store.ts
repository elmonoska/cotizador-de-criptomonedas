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

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
  cryptoCurrencies: [],
  cryptoPrice: null,
  isLoadingCrypto: false,
  isLoadingCryptoPrice: false,
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
  fetchData: async (pair) => {
    set(() => ({isLoadingCryptoPrice: true}));
    try {
      const cryptoPrice = await fetchCurrentCryptoPrice(pair);
      set(() => ({cryptoPrice}))
    } catch (error) {
      console.error(error)
    } finally {
      set(() => ({isLoadingCryptoPrice: false}));
    }
  }
})))