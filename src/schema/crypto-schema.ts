import {z} from 'zod';

export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const CryptoInfoSchema = z.object({
  ID: z.number(),
  LOGO_URL: z.string(),
  NAME: z.string(),
  SYMBOL: z.string(),
})

export const CryptoCurrenciesSchema = z.array(CryptoInfoSchema)

export const PairSchema = z.object({
  currency: z.string(),
  criptocurrency: z.string(),
})

export const CryptoPriceSchema = z.object({
  VALUE: z.number(),
  MOVING_24_HOUR_HIGH: z.number(),
  MOVING_24_HOUR_LOW: z.number(),
  MOVING_24_HOUR_CHANGE_PERCENTAGE: z.number(),
  VALUE_LAST_UPDATE_TS: z.number(),
  IMAGE_URL: z.string().optional()
})
