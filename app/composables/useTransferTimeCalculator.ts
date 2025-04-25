import type { TransferTimeInput, TransferTimeResult } from '@/types'

export function useTransferTimeCalculator(input: TransferTimeInput): TransferTimeResult | null {
  let { dataSize, dataUnit, bandwidth, bandwidthUnit, protocol, overheadPercent = 0, estimatedLatencyMs } = input

  // Validate positive values
  if (dataSize <= 0 || bandwidth <= 0) return null

  // Valid unit maps
  let dataUnitMap = { KB: 1 / 1024, MB: 1, GB: 1024, TB: 1024 * 1024 }
  let bandwidthUnitMap = { Kbps: 1 / 1000, Mbps: 1, Gbps: 1000 }

  // Check for invalid units
  if (!(dataUnit in dataUnitMap)) return null
  if (!(bandwidthUnit in bandwidthUnitMap)) return null

  let dataSizeInMB = dataSize * dataUnitMap[dataUnit]
  let bandwidthInMbps = bandwidth * bandwidthUnitMap[bandwidthUnit]

  let effectiveSpeed = bandwidthInMbps * ((100 - overheadPercent) / 100)
  let timeInSeconds = (dataSizeInMB * 8) / effectiveSpeed
  let formattedTime = formatSeconds(timeInSeconds)

  let notes = [
    overheadPercent > 0 ? `${overheadPercent}% overhead considered` : '',
    estimatedLatencyMs ? `Estimated latency: ${estimatedLatencyMs}ms` : ''
  ].filter(Boolean).join(' • ')

  return {
    ...input,
    effectiveSpeedMbps: Math.round(effectiveSpeed * 100) / 100,
    transferTimeInSeconds: Math.round(timeInSeconds * 100) / 100,
    formattedTime,
    notes
  }
}

function formatSeconds(seconds: number): string {
  let m = Math.floor(seconds / 60)
  let s = Math.round(seconds % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}
