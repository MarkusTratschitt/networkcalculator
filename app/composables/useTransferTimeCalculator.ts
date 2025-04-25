// composables/useTransferTimeCalculator.ts

import type { TransferTimeInput, TransferTimeResult } from '@/types'

/**
 * Calculates transfer time based on data size, bandwidth and optional overhead/latency.
 * Automatically handles unit conversion and basic input validation.
 */
export function useTransferTimeCalculator(input: TransferTimeInput): TransferTimeResult | null {
  try {
    let { dataSize, dataUnit, bandwidth, bandwidthUnit, protocol, overheadPercent = 0, estimatedLatencyMs } = input

    if (dataSize <= 0 || bandwidth <= 0) {
      throw new Error('Data size and bandwidth must be greater than 0.')
    }

    // Unit multipliers with strict validation
    let dataUnitMap = { KB: 1 / 1024, MB: 1, GB: 1024, TB: 1024 * 1024 }
    let bandwidthUnitMap = { Kbps: 1 / 1000, Mbps: 1, Gbps: 1000 }

    if (!(dataUnit in dataUnitMap)) {
      throw new Error(`Invalid data unit: ${dataUnit}`)
    }
    if (!(bandwidthUnit in bandwidthUnitMap)) {
      throw new Error(`Invalid bandwidth unit: ${bandwidthUnit}`)
    }

    let dataSizeInMB = dataSize * dataUnitMap[dataUnit as keyof typeof dataUnitMap]
    let bandwidthInMbps = bandwidth * bandwidthUnitMap[bandwidthUnit as keyof typeof bandwidthUnitMap]

    // Apply protocol overhead
    let effectiveSpeed = bandwidthInMbps * ((100 - overheadPercent) / 100)

    // Calculate transfer time (in seconds)
    let timeInSeconds = (dataSizeInMB * 8) / effectiveSpeed

    // Format transfer time as readable string
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
  } catch (error) {
    console.error('[TransferTimeCalculator]', error)
    return null
  }
}

function formatSeconds(seconds: number): string {
  let m = Math.floor(seconds / 60)
  let s = Math.round(seconds % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}
