import type { IPAddressWithFormat, IPFormat } from '@/types'

/**
 * Converts an IPv4 address between binary, decimal and hexadecimal formats.
 * Accepts only valid IPv4 dotted-decimal input.
 */

export function useIPConverter(ip: string, format: IPFormat): IPAddressWithFormat | null {
  if (!validateIPv4(ip)) {
    console.warn('[IPConverter] Invalid IPv4 address:', ip)
    return null
  }

  let octets = ip.split('.').map(Number)

  let binary = octets.map(o => o.toString(2).padStart(8, '0')).join('.')
  let decimal = octets.map(o => o.toString(10)).join('.')
  let hexadecimal = octets.map(o => o.toString(16).toUpperCase().padStart(2, '0')).join('.')

  return {
    value: ip,
    format,
    binary,
    decimal,
    hexadecimal,
    version: 'IPv4'
  }
}

function validateIPv4(ip: string): boolean {
  let regex = /^(\d{1,3}\.){3}\d{1,3}$/
  return regex.test(ip) && ip.split('.').every(octet => {
    let num = Number(octet)
    return num >= 0 && num <= 255
  })
}
