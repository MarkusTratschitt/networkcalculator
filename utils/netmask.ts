export function cidrToSubnetMask(cidr: number): string {
  if (cidr < 0 || cidr > 32) return ''

  const mask = 0xffffffff << (32 - cidr)
  return [
    (mask >>> 24) & 0xff,
    (mask >>> 16) & 0xff,
    (mask >>> 8) & 0xff,
    mask & 0xff
  ].join('.')
}
export function subnetMaskToCIDR(mask: string): number | null {
  const parts = mask.split('.');
  if (parts.length !== 4) return null;
  let cidr = 0;
  for (const part of parts) {
    const num = parseInt(part, 10);
    if (num === 255) {
      cidr += 8;
    } else {
      const binaryStr = num.toString(2);
      cidr += binaryStr.split('1').length - 1;
      break;
    }
  }
  return cidr;
}