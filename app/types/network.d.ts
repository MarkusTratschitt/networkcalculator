// app/types/network.d.ts

export {}

declare global {
  /** IPv4 address in dotted decimal format */
  type IPv4 = `${number}.${number}.${number}.${number}`

  /** Basic IPv6 format as a string (not validated here) */
  type IPv6 = string

  /** IP version identifier */
  type IPVersion = 'ipv4' | 'ipv6'

  /** Format types for IP representation */
  type IPFormat = 'decimal' | 'binary' | 'hexadecimal'

  /** Raw IP input with format and version */
  interface IPAddress {
    value: string
    format: IPFormat
    version: IPVersion
  }

  /** Common format conversions for IPv4 */
  interface IPAddressWithFormat extends IPAddress {
    binary: string
    decimal: string
    hexadecimal: string
  }

  /** Detailed information for IPv4 subnets */
  interface SubnetInfo {
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

  /** Full IPv4 address details including subnet info */
  interface FullIPAddressInfo extends IPAddressWithFormat {
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

  /** IPv6 address details with expanded and compressed format */
  interface IPv6Address {
    value: string
    expanded: string
    compressed: string
    binary: string
    hexadecimal: string
    version: 'ipv6'
    format: IPFormat
  }

  /** IPv6 subnet calculation results */
  interface IPv6SubnetInfo {
    address: string
    prefixLength: number
    networkAddress: string
    firstAddress: string
    lastAddress: string
    numberOfAddresses: string // too large for number
  }

  /** Bandwidth calculation result */
  interface BandwidthCalculation {
    dataSizeInMB: number
    bandwidthInMbps: number
    transferTimeInSeconds: number
  }

  /** Latency result based on distance and medium speed */
  interface LatencyResult {
    distanceInKm: number
    speedInMedium: number // m/s
    estimatedLatencyMs: number
  }

  /** Transfer protocol types for comparison */
  type TransferProtocol = 'TCP' | 'UDP'

  /** Unit types for data and bandwidth */
  type DataUnit = 'KB' | 'MB' | 'GB' | 'TB'
  type BandwidthUnit = 'Kbps' | 'Mbps' | 'Gbps'

  /** Input model for transfer time calculations */
  interface TransferTimeInput {
    dataSize: number
    dataUnit: DataUnit
    bandwidth: number
    bandwidthUnit: BandwidthUnit
    protocol?: TransferProtocol
    overheadPercent?: number
    estimatedLatencyMs?: number
  }

  /** Output model for transfer time calculations (extends input) */
  interface TransferTimeResult extends TransferTimeInput {
    effectiveSpeedMbps: number
    transferTimeInSeconds: number
    formattedTime: string // e.g. '2m 30s'
    notes?: string
  }
}
