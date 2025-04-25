/**
 * Ergebnis der Latenzberechnung auf Basis Entfernung und Medium.
 */
export interface LatencyResult {
  distanceInKm: number
  speedInMedium: number
  estimatedLatencyMs: number
}
