import axios from "axios";
import { CryptoCurrenciesSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import type { Pair } from "../types";
import { COINDESK_API } from "../constants";


export async function getCryptos() {
  const BASE_URL = 'https://data-api.coindesk.com/asset/v1/top/list';
  const params = {
    page: 1,
    page_size: 10,
    sort_by: "CIRCULATING_MKT_CAP_USD",
    sort_direction: "DESC",
    toplist_quote_asset: "USD",
    groups: "ID,BASIC",
    api_key: COINDESK_API,
  };

  const {data: {Data: {LIST}}} = await axios.get(BASE_URL, {params});
  
  const result = CryptoCurrenciesSchema.safeParse(LIST);
  if (result.success) {
    return result.data
  } else {
    throw new Error("Error al obtener las criptos")
  }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
  const BASE_URL = "https://data-api.coindesk.com/index/cc/v1/latest/tick";
  const INSTRUMENT = `${pair.criptocurrency}-${pair.currency}`;
  const params = {
    market: "cadli",
    instruments: INSTRUMENT,
    apply_mapping: "true",
    groups: "ID,VALUE,MOVING_24_HOUR",
    api_key: COINDESK_API,
  };

  const {data: {Data: {[INSTRUMENT]: crypto}}} = await axios.get(BASE_URL, {params});

  const result = CryptoPriceSchema.safeParse(crypto);
  if (result.success) {
    return result.data
  } else {
    throw new Error("Error al obtener el precio de la cripto")
  }
}
