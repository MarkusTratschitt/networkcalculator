import type { IPFormat } from './IPFormat'

/**
 * IPv6-Adresse in verschiedenen Darstellungsformen.
 */
export interface IPv6Address {
  value: string
  expanded: string
  compressed: string
  binary: string
  hexadecimal: string
  version: 'ipv6'
  format: IPFormat
}
