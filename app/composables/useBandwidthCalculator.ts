import type { BandwidthCalculation } from '@/types'

/**
 * Calculates the required bandwidth based on file size (MB) and time (seconds).
 * Returns the bandwidth in Mbps.
 */

export function useBandwidthCalculator(dataSizeInMB: number, transferTimeInSeconds: number): BandwidthCalculation {
  const bandwidthInMbps = (dataSizeInMB * 8) / transferTimeInSeconds

  return {
    dataSizeInMB,
    transferTimeInSeconds,
    bandwidthInMbps: Number(bandwidthInMbps.toFixed(2))
  }
}
