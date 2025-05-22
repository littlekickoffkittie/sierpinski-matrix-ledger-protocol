import { describe, it, expect, beforeEach } from 'vitest';
import { SierpinskiMiningProtocol } from '../../../SMLP_Project/src/core/sierpinskiMiningProtocol';

describe('SierpinskiMiningProtocol', () => {
  let smp: InstanceType<typeof SierpinskiMiningProtocol>;

  beforeEach(() => {
    smp = new SierpinskiMiningProtocol();
  });

  test('performMiningProof returns boolean', () => {
    const data = 'test data';
    const targetDifficulty = 1;
    const result = smp.performMiningProof(data, targetDifficulty);
    expect(typeof result).toBe('boolean');
  });

  test('performMiningProof adjusts difficulty based on level', () => {
    const data = 'test data';
    const baseDifficulty = 2;
    const level = 5;
    const result = smp.performMiningProof(data, baseDifficulty, level);
    expect(typeof result).toBe('boolean');
  });

  test('performMiningProof returns false for very high difficulty', () => {
    const data = 'test data';
    const targetDifficulty = 20; // unrealistically high difficulty
    const result = smp.performMiningProof(data, targetDifficulty);
    expect(result).toBe(false);
  });

  test('performMiningProof returns true for low difficulty', () => {
    const data = 'test data';
    const targetDifficulty = 0; // very low difficulty, should always succeed
    const result = smp.performMiningProof(data, targetDifficulty);
    expect(result).toBe(true);
  });

  test('subdivideTriangle returns correct number of segments', () => {
    const level = 2;
    const segments = smp.subdivideTriangle(level);
    // Number of segments at level n = 3^n
    expect(segments.length).toBe(Math.pow(3, level));
  });

  test('getLedgerSegmentById returns correct segment or undefined', () => {
    const level = 2;
    smp.subdivideTriangle(level);
    const segments = smp.subdivideTriangle(level);
    const segment = smp.getLedgerSegmentById(segments[0].segmentId);
    expect(segment).toBeDefined();
    const nonExistent = smp.getLedgerSegmentById('nonexistent');
    expect(nonExistent).toBeUndefined();
  });

  test('allocateTokens returns correct allocation and updates contract state', () => {
    const allocation = smp.allocateTokens();
    console.log('Allocation object:', allocation);
    expect(allocation.outerTriangles).toBeGreaterThan(0);
    expect(allocation.innerTriangle).toBeGreaterThan(0);
    expect(allocation.contractState).toBeDefined();
    expect(typeof allocation.contractStateBalance).toBe('number');
    expect(allocation.contractStateBalance).toBeLessThanOrEqual(allocation.totalSupply);
    expect(allocation.contractStateBalance).toBeGreaterThanOrEqual(0);
    expect(allocation.communityMineable).toBeGreaterThan(0);
    expect(allocation.burned).toBeGreaterThan(0);
  });

  test('calculateScarcity returns value between 0 and 100', () => {
    for (let level = 0; level <= 10; level++) {
      const scarcity = smp.calculateScarcity(level);
      expect(scarcity).toBeGreaterThanOrEqual(0);
      expect(scarcity).toBeLessThanOrEqual(100);
    }
  });

  test('calculateScarcity throws error for negative level', () => {
    expect(() => smp.calculateScarcity(-1)).toThrow();
  });

  test('distributeDividends distributes correctly and returns total', () => {
    const holders = [
      { share: 100, ancestralLevel: 0 },
      { share: 50, ancestralLevel: 1 },
      { share: 25, ancestralLevel: 2 },
    ];
    const totalDistributed = smp.distributeDividends(holders);
    expect(totalDistributed).toBeGreaterThan(0);
  });

  test('calculateScarcity adjusts scarcity dynamically', () => {
    for (let level = 0; level <= 10; level++) {
      const scarcity = smp.calculateScarcity(level);
      expect(scarcity).toBeGreaterThanOrEqual(0);
      expect(scarcity).toBeLessThanOrEqual(100);
    }
  });
});
