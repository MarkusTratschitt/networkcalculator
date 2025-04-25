// composables/useSubnetCalculator.ts

import type { SubnetInfo, IPVersion } from '@/types'

/**
 * A class to handle IPv4 subnet calculations using CIDR notation.
 * Validates input and computes network-related properties.
 */
export class SubnetCalculator {
  ip: IPv4
  cidr: number

  constructor(ip: IPv4, cidr: number) {
    if (!SubnetCalculator.validateIP(ip)) {
      throw new Error(`Invalid IPv4 address: ${ip}`)
    }
    if (cidr < 0 || cidr > 32) {
      throw new Error(`Invalid CIDR: ${cidr}`)
    }
    this.ip = ip
    this.cidr = cidr
  }

  /** Validate an IPv4 address using regex */
  static validateIP(ip: string): boolean {
    let regex = /^(\d{1,3}\.){3}\d{1,3}$/
    return regex.test(ip) && ip.split('.').every(octet => {
      let num = Number(octet)
      return num >= 0 && num <= 255
    })
  }

  /** Get the subnet mask as dotted decimal string */
  getSubnetMask(): string {
    let mask = -1 << (32 - this.cidr)
    let octets = [
      (mask >>> 24) & 255,
      (mask >>> 16) & 255,
      (mask >>> 8) & 255,
      mask & 255
    ]
    return octets.join('.')
  }

  /** Get the wildcard mask (inverse of subnet mask) */
  getWildcardMask(): string {
    return this.getSubnetMask().split('.').map(octet => (255 - Number(octet))).join('.')
  }

  /** Calculate the network address */
  getNetworkAddress(): string {
    let ipParts = this.ip.split('.').map(Number)
    let maskParts = this.getSubnetMask().split('.').map(Number)
    let netParts = ipParts.map((part, i) => part & maskParts[i])
    return netParts.join('.')
  }

  /** Calculate the broadcast address */
  getBroadcastAddress(): string {
    let net = this.getNetworkAddress().split('.').map(Number)
    let wild = this.getWildcardMask().split('.').map(Number)
    let broadcast = net.map((part, i) => part | wild[i])
    return broadcast.join('.')
  }

  /** Get the first usable host in the subnet */
  getFirstHost(): string {
    let net = this.getNetworkAddress().split('.').map(Number)
    net[3] += 1
    return net.join('.')
  }

  /** Get the last usable host in the subnet */
  getLastHost(): string {
    let bc = this.getBroadcastAddress().split('.').map(Number)
    bc[3] -= 1
    return bc.join('.')
  }

  /** Count the number of usable hosts in the subnet */
  getHostCount(): number {
    return this.cidr === 32 ? 1 : Math.max(0, Math.pow(2, 32 - this.cidr) - 2)
  }

  /** Return a structured SubnetInfo object */
  toSubnetInfo(): SubnetInfo {
    return {
      ip: this.ip,
      cidr: this.cidr,
      subnetMask: this.getSubnetMask(),
      wildcardMask: this.getWildcardMask(),
      networkAddress: this.getNetworkAddress(),
      broadcastAddress: this.getBroadcastAddress(),
      firstHost: this.getFirstHost(),
      lastHost: this.getLastHost(),
      numberOfHosts: this.getHostCount(),
    }
  }
}

/**
 * Factory function to create a SubnetCalculator instance.
 */
export function useSubnetCalculator(ip: IPv4, cidr: number): SubnetCalculator | null {
  try {
    return new SubnetCalculator(ip, cidr)
  } catch (error) {
    console.error('[SubnetCalculator]', error)
    return null
  }
}
