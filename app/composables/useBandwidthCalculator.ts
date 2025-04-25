import type { BandwidthCalculation } from '@/types'

/**
 * Berechnet die erforderliche Bandbreite basierend auf Dateigröße (MB) und Zeit (Sekunden).
 * Gibt die Bandbreite in Mbps zurück.
 */
export function useBandwidthCalculator(dataSizeInMB: number, transferTimeInSeconds: number): BandwidthCalculation {
  const bandwidthInMbps = (dataSizeInMB * 8) / transferTimeInSeconds

  return {
    dataSizeInMB,
    transferTimeInSeconds,
    bandwidthInMbps: Number(bandwidthInMbps.toFixed(2))
  }
}
