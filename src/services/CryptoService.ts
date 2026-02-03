import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import type { Pair } from "../types";


export async function getCryptos() {
  const BASE_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull';
  const params = {limit: 20, tsym: "USD"};
  const {data: {Data}} = await axios.get(BASE_URL, {params});
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data
  } else {
    throw new Error("Error al obtener las criptos")
  }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
  const BASE_URL = "https://min-api.cryptocompare.com/data/pricemultifull";
  const params = {
    tryConversion: true,
    fsyms: pair.criptocurrency,
    tsyms: pair.currency,
    sign: true
  };
  const {data: {DISPLAY}} = await axios.get(BASE_URL, {params});
  const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency]);
  if (result.success) {
    return result.data
  } else {
    throw new Error("Error al obtener el precio de la cripto")
  }
}