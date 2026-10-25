import { z } from "zod";
import { CurrencySchema, PairSchema, CryptoPriceSchema, CryptoInfoSchema, CryptoCurrenciesSchema } from "../schema/crypto-schema";

export type Currency = z.infer<typeof CurrencySchema>

export type CryptoCurrency = z.infer<typeof CryptoInfoSchema>

export type CryptoCurrencies = z.infer<typeof CryptoCurrenciesSchema>

export type Pair = z.infer<typeof PairSchema>

export type CryptoPrice = z.infer<typeof CryptoPriceSchema>
