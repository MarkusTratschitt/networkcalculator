import type { TransferTimeInput } from './TransferTimeInput'

/**
 * Ergebnis der Transferzeitberechnung inklusive effektiver Bandbreite.
 */
export interface TransferTimeResult extends TransferTimeInput {
  effectiveSpeedMbps: number
  transferTimeInSeconds: number
  formattedTime: string
  notes?: string
}
