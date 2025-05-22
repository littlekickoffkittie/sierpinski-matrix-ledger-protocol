import { describe, it, expect } from 'vitest';
import { GeometricConsensus } from '../src/geometricConsensus';
import { SelfOrganizingEconomy } from '../src/selfOrganizingEconomy';
import { FractalSmartContract } from '../src/fractalSmartContracts';
import { OracleTriangleSystem } from '../src/oracleTriangleSystem';

describe('SMLP Core Components Part 2', () => {
  let consensus: GeometricConsensus;
  let economy: SelfOrganizingEconomy;
  let contract: FractalSmartContract;
  let oracleSystem: OracleTriangleSystem;

  beforeEach(() => {
    consensus = new GeometricConsensus();
    economy = new SelfOrganizingEconomy();
    contract = new FractalSmartContract({ balance: 1000 });
    oracleSystem = new OracleTriangleSystem();
  });

  it('should validate consensus correctly', () => {
    const votes = [true, true, false, true];
    expect(consensus.validateConsensus(votes)).toBe(true);
  });

  it('should handle multiple votes and consensus edge cases', () => {
    const votesAllTrue = [true, true, true, true];
    const votesAllFalse = [false, false, false, false];
    const votesMixed = [true, false, true, false];
    expect(consensus.validateConsensus(votesAllTrue)).toBe(true);
    expect(consensus.validateConsensus(votesAllFalse)).toBe(false);
    expect(consensus.validateConsensus(votesMixed)).toBe(false);
  });

  it('should handle economic feedback loop with varying inputs', () => {
    const inputs = [100, 120, 80, 110, 90];
    inputs.forEach(input => {
      const state = economy.feedbackStep(input);
      expect(typeof state).toBe('number');
      expect(state).toBeGreaterThan(0);
    });
  });

  it('should handle fractal smart contract transfer edge cases', () => {
    contract.registerFunction('transfer', (state, amount) => {
      if (amount > state.balance) throw new Error('Insufficient balance');
      return { ...state, balance: state.balance - amount };
    });
    expect(() => contract.executeFunction('transfer', 2000)).toThrow('Insufficient balance');
    const newState = contract.executeFunction('transfer', 500);
    expect(newState.balance).toBe(500);
  });

  it('should handle oracle data updates and listeners', async () => {
    let updateReceived = false;
    oracleSystem.onOracleDataUpdate('TestSource', (data) => {
      updateReceived = true;
      expect(data).toHaveProperty('price');
    });
    await oracleSystem.fetchOracleData('TestSource');
    expect(updateReceived).toBe(true);
  });
});
