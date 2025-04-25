import type { IPAddress } from './IPAddress'

/**
 * Erweiterung von IPAddress mit konvertierten Formaten.
 */
export interface IPAddressWithFormat extends IPAddress {
  binary: string
  decimal: string
  hexadecimal: string
}
