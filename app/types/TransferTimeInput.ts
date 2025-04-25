import type { DataUnit } from './DataUnit'
import type { BandwidthUnit } from './BandwidthUnit'
import type { TransferProtocol } from './TransferProtocol'

/**
 * Eingabemodell für Transferzeitberechnungen.
 */
export interface TransferTimeInput {
  dataSize: number
  dataUnit: DataUnit
  bandwidth: number
  bandwidthUnit: BandwidthUnit
  protocol?: TransferProtocol
  overheadPercent?: number
  estimatedLatencyMs?: number
}
