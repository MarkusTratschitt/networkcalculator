export function cidrToSubnetMask(cidr: number): string {
  if (cidr < 0 || cidr > 32) return ''
  let mask = 0xffffffff << (32 - cidr)
  return [
    (mask >>> 24) & 0xff,
    (mask >>> 16) & 0xff,
    (mask >>> 8) & 0xff,
    mask & 0xff
  ].join('.')
}

export function subnetMaskToCIDR(mask: string): number | null {
  let parts = mask.split('.')
  if (parts.length !== 4) return null

  let binary = parts
    .map(part => parseInt(part, 10).toString(2).padStart(8, '0'))
    .join('')

  if (!/^1*0*$/.test(binary)) return null

  return binary.indexOf('0')
}
