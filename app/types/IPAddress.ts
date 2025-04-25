import type { IPFormat } from './IPFormat'
import type { IPVersion } from './IPVersion'

/**
 * Rohformat einer IP-Adresse mit Version und Eingabeformat.
 */
export interface IPAddress {
  value: string
  format: IPFormat
  version: IPVersion
}
