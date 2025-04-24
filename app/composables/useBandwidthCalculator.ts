// composables/useBandwidthCalculator.ts

import type { BandwidthCalculation } from '@/types/network'

/**
 * Calculates required bandwidth in Mbps for a given file size and transfer duration.
 * Uses: bandwidth = (dataSizeMB * 8) / seconds
 */
export function useBandwidthCalculator(dataSizeInMB: number, transferTimeInSeconds: number): BandwidthCalculation | null {
  if (dataSizeInMB <= 0 || transferTimeInSeconds <= 0) {
    console.warn('[BandwidthCalculator] Invalid input:', { dataSizeInMB, transferTimeInSeconds })
    return null
  }

  let bandwidthInMbps = (dataSizeInMB * 8) / transferTimeInSeconds

  return {
    dataSizeInMB,
    bandwidthInMbps: Math.round(bandwidthInMbps * 100) / 100,
    transferTimeInSeconds: Math.round(transferTimeInSeconds * 100) / 100
  }
}

