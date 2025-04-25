import type { IPAddressWithFormat } from './IPAddressWithFormat'
import type { SubnetInfo } from './SubnetInfo'

/**
 * Vollständige IP-Adresse mit Subnetzdetails.
 */
export interface FullIPAddressInfo extends IPAddressWithFormat {
  cidr: number
  subnetMask: string
  wildcardMask: string
  networkAddress: string
  broadcastAddress: string
  firstHost: string
  lastHost: string
  numberOfHosts: number
  subnetInfos?: {
    default?: SubnetInfo
    cidr?: SubnetInfo
    wildcard?: SubnetInfo
    cidrWildcard?: SubnetInfo
    cidrDecimal?: SubnetInfo
  }
}
