/**
 * Struktur zur Bandbreitenberechnung basierend auf Dateigröße und Übertragungszeit.
 */
export interface BandwidthCalculation {
  dataSizeInMB: number
  transferTimeInSeconds: number
  bandwidthInMbps: number
}
