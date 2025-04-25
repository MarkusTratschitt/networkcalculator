/**
 * Informationen zu einem IPv4-Subnetz.
 */
export interface SubnetInfo {
  ip: string
  cidr: number
  networkAddress: string
  broadcastAddress: string
  firstHost: string
  lastHost: string
  numberOfHosts: number
  wildcardMask: string
  subnetMask: string
}
