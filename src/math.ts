/**
 * Calculate an arc angle in radians for a given arc index and arc count.
 *
 * We prefer a trigonometry unit circle such as for polar coordinates,
 * where the radian angle increases in the counter-clockwise direction.
 * 
 * - PI * 0.0 radians is the positive x-axis
 * - PI * 0.5 radians is the positive y-axis
 * - PI * 1.0 radians is the negative x-axis
 * - PI * 1.5 radians is the negative y-axis
 * 
 * Caution: this process is quite different from the D3 charting library,
 * where the radian angle increases in the clockwise direction.
 *
 * @remarks
 * This function helps with layout of blips on the radar.
 *
 * @param arcIndex - The arc index (0-based) such as 0, 1, 2, 3 for four arcs.
 * @param arcCount - The arch count (1-based) such as 4 for four arcs.
 * @returns The arc angle in radians.
 */
export function arcToRadians(arcIndex: number, arcCount: number): number {
    return (arcIndex / arcCount) * Math.PI * 2;
}

/**
 * Calculate an arc angle in radians for a given arc index and arc count, 
 * plus a random fuzzy offset toward the middle of the arc.
 *
 * We prefer a trigonometry unit circle such as for polar coordinates,
 * where the radian angle increases in the counter-clockwise direction.
 * 
 * - PI * 0.0 radians is the positive x-axis
 * - PI * 0.5 radians is the positive y-axis
 * - PI * 1.0 radians is the negative x-axis
 * - PI * 1.5 radians is the negative y-axis
 * 
 * Caution: this process is quite different from the D3 charting library,
 * where the radian angle increases in the clockwise direction.
 *
 * @remarks
 * This function helps with layout of blips on the radar.
 *
 * @param arcIndex - The index (0-based) such as 0, 1, 2, 3 for four arcs.
 * @param arcCount - The count (1-based) such as 4 for four arcs.
 * @returns The arc angle in radians with fuzz.
 */
export function arcToRadiansFuzzy(arcIndex: number, arcCount: number): number {
    return ((arcIndex + (Math.random() * 0.7 + 0.1)) / arcCount) * Math.PI * 2;
}

/**
 * Calculate a ring radius on a unit circle i.e. range 0..1.
 *
 * @remarks
 * This function helps with layout of blips on the radar.
 *
 * @param ringIndex - The index (0-based) such as 0, 1, 2, 3 for four rings.
 * @param ringCount - The count (1-based) such as 4 for four rings.
 * @returns The ring radius on a unit circle 0..1.
 */
export function ringToRadius(ringIndex: number, ringCount: number): number {
    return ringIndex / ringCount;
}

/**
 * Calculate a ring radius on a unit circle i.e. 0..1, 
 * plus a random fuzzy offset toward the middle of the ring.
 *
 * @remarks
 * This function helps with layout of blips on the radar.
 *
 * @param ringIndex - The index (0-based) such as 0, 1, 2, 3 for four rings.
 * @param ringCount - The count (1-based) such as 4 for four rings.
 * @returns The ring radius with fuzz on a unit circle 0..1.
 */
export function ringToRadiusFuzzy(ringIndex: number, ringCount: number): number {
    return (ringIndex + (Math.random() * 0.4 + 0.3)) / ringCount;
}
