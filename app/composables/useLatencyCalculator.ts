// composables/useLatencyCalculator.ts

import type { LatencyResult } from '@/types'

/**
 * Calculates latency in milliseconds based on distance and transmission medium speed.
 * Uses the formula: latency = (distance / speed) * 1000
 */
export function useLatencyCalculator(distanceInKm: number, speedInMedium: number): LatencyResult | null {
  if (distanceInKm <= 0 || speedInMedium <= 0) {
    console.warn('[LatencyCalculator] Invalid input:', { distanceInKm, speedInMedium })
    return null
  }

  let distanceInMeters = distanceInKm * 1000
  let latencyMs = (distanceInMeters / speedInMedium) * 1000

  return {
    distanceInKm,
    speedInMedium,
    estimatedLatencyMs: Math.round(latencyMs * 100) / 100
  }
}
