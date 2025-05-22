import { describe, it, expect, beforeEach } from 'vitest';
import { GenesisTriangle } from '../core/genesisTriangle';
import { QuantumTriangleStates } from '../matrix/quantumTriangleStates';
import { SierpinskiMiningProtocol } from '../core/sierpinskiMiningProtocol';
import { TripleBurnProtocol } from '../economics/tripleBurnProtocol';
import { AncestralDividendSystem } from '../economics/ancestralDividendSystem';

describe('SMLP Core Components Part 1', () => {
  let genesisTriangle: GenesisTriangle;
  let quantumStates: QuantumTriangleStates;
  let smp: SierpinskiMiningProtocol;
  let burnProtocol: TripleBurnProtocol;
  let dividendSystem: AncestralDividendSystem;

  beforeEach(() => {
    genesisTriangle = new GenesisTriangle();
    quantumStates = new QuantumTriangleStates();
    smp = new SierpinskiMiningProtocol();
    burnProtocol = new TripleBurnProtocol();
    dividendSystem = new AncestralDividendSystem();
  });

  it('should initialize Genesis Triangle with correct total supply', () => {
    expect(genesisTriangle.getTotalSupply()).toBe(21000000);
  });

  it('should initialize and collapse quantum states', () => {
    quantumStates.initializeStates(1);
    const states = quantumStates.getAllStates();
    expect(states.length).toBeGreaterThan(0);
    quantumStates.collapseState(states[0].segmentId, { stateId: 1, description: 'Test collapse' });
    const state = quantumStates.getState(states[0].segmentId);
    expect(state?.quantumState).toBe('collapsed');
  });

  it('should allocate tokens correctly in SMP', () => {
    const allocation = smp.allocateTokens();
    expect(allocation.outerTriangles).toBeCloseTo(0.35 * 21000000 * 2);
    expect(allocation.innerTriangle).toBeCloseTo(0.30 * 21000000);
  });

  it('should burn tokens correctly in Triple Burn Protocol', () => {
    burnProtocol.tripleBurn(9000);
    expect(burnProtocol.getTotalBurned()).toBe(9000);
  });

  it('should distribute dividends correctly', () => {
    const holders = [
      { share: 1000, ancestralLevel: 0 },
      { share: 500, ancestralLevel: 1 },
    ];
    const total = dividendSystem.distributeDividends(holders);
    expect(total).toBeGreaterThan(0);
  });

  // Tests for SierpinskiMiningProtocol enhancements
  describe('SierpinskiMiningProtocol Enhancements', () => {
    let smp: SierpinskiMiningProtocol;

    beforeEach(() => {
      smp = new SierpinskiMiningProtocol();
    });

    it('should subdivide triangle correctly at level 1', () => {
      const result = smp.subdivideTriangle(1);
      expect(result.length).toBe(3);
      expect(result[0].segmentId).toBe('root0');
      expect(result[1].segmentId).toBe('root1');
      expect(result[2].segmentId).toBe('root2');
    });

    it('should allocate tokens correctly', () => {
      const allocation = smp.allocateTokens();
      expect(allocation.outerTriangles).toBeCloseTo(0.35 * 21000000 * 2);
      expect(allocation.innerTriangle).toBeCloseTo(0.30 * 21000000);
    });

    it('should calculate PoFW difficulty correctly', () => {
      const easyData = '0000000000';
      const hardData = 'fffffffffff';
      expect(smp.calculatePoFWDifficulty(easyData, 1)).toBe(true);
      expect(smp.calculatePoFWDifficulty(hardData, 10)).toBe(false);
    });

    it('should calculate scarcity with increasing level', () => {
      const lowScarcity = smp.calculateScarcity(1);
      const highScarcity = smp.calculateScarcity(10);
      expect(lowScarcity).toBeLessThan(highScarcity);
    });
  });
});
