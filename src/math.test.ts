import { expect, test } from 'vitest'
import { 
    arcToRadians, 
    arcToRadiansFuzzy, 
    ringToRadius, 
    ringToRadiusFuzzy 
} from './math.js'

test('arcToRadians', () => {
    const arcCount = 4

    const a = arcToRadians(0, arcCount)
    expect(a).toBe(Math.PI * 0.0)

    const b = arcToRadians(1, arcCount)
    expect(b).toBe(Math.PI * 0.5)

    const c = arcToRadians(2, arcCount)
    expect(c).toBe(Math.PI * 1.0)

    const d = arcToRadians(3, arcCount)
    expect(d).toBe(Math.PI * 1.5)
})

test('arcToRadiansFuzzy', () => {
    const arcCount = 4
    const fuzz = 0.05

    const a = arcToRadiansFuzzy(0, arcCount)
    expect(a).toBeGreaterThanOrEqual(Math.PI * 0.0 + fuzz)
    expect(a).toBeLessThan(Math.PI * 0.5 - fuzz)

    const b = arcToRadiansFuzzy(1, arcCount)
    expect(b).toBeGreaterThanOrEqual(Math.PI * 0.5 + fuzz)
    expect(b).toBeLessThan(Math.PI * 1.0 - fuzz)

    const c = arcToRadiansFuzzy(2, arcCount)
    expect(c).toBeGreaterThanOrEqual(Math.PI * 1.0 + fuzz)
    expect(c).toBeLessThan(Math.PI * 1.5 - fuzz)

    const d = arcToRadiansFuzzy(3, arcCount)
    expect(d).toBeGreaterThanOrEqual(Math.PI * 1.5 + fuzz)
    expect(d).toBeLessThan(Math.PI * 2.0 - fuzz)
})

test('ringToRadius', () => {
    const ringCount = 4

    const a = ringToRadius(0, ringCount)
    expect(a).toBe(0.00)

    const b = ringToRadius(1, ringCount)
    expect(b).toBe(0.25)

    const c = ringToRadius(2, ringCount)
    expect(c).toBe(0.50)

    const d = ringToRadius(3, ringCount)
    expect(d).toBe(0.75)
})

test('ringToRadiusFuzzy', () => {
    const ringCount = 4
    const fuzz = 0.05

    const a = ringToRadiusFuzzy(0, ringCount)
    expect(a).toBeGreaterThanOrEqual(0.0 + fuzz)
    expect(a).toBeLessThan(0.25 - fuzz)

    const b = ringToRadiusFuzzy(1, ringCount)
    expect(b).toBeGreaterThanOrEqual(0.25 + fuzz)
    expect(b).toBeLessThan(0.50 - fuzz)

    const c = ringToRadiusFuzzy(2, ringCount)
    expect(c).toBeGreaterThanOrEqual(0.50 + fuzz)
    expect(c).toBeLessThan(0.75 - fuzz)

    const d = ringToRadiusFuzzy(3, ringCount)
    expect(d).toBeGreaterThanOrEqual(0.75 + fuzz)
    expect(d).toBeLessThan(1.00 - fuzz)
})
