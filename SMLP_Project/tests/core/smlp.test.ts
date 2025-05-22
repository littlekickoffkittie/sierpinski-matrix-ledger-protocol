import { describe, it, expect, beforeEach } from 'vitest';
import { GenesisTriangle } from '../../src/genesisTriangle';
import { QuantumTriangleStates } from '../../src/quantumTriangleStates';
import { SierpinskiMiningProtocol } from '../../src/sierpinskiMiningProtocol';
import { TripleBurnProtocol } from '../../src/tripleBurnProtocol';
import { AncestralDividendSystem } from '../../src/ancestralDividendSystem';
import { GeometricConsensus } from '../../src/geometricConsensus';
import { SelfOrganizingEconomy } from '../../src/selfOrganizingEconomy';
import { FractalSmartContract } from '../../src/fractalSmartContracts';
import { OracleTriangleSystem } from '../../src/oracleTriangleSystem';
import { NetworkGovernance } from '../../src/networkGovernance';
import { SierpinskiVirtualMachine } from '../../src/sierpinskiVirtualMachine';

describe('SMLP Core Components', () => {
  let genesisTriangle: GenesisTriangle;
  let quantumStates: QuantumTriangleStates;
  let smp: SierpinskiMiningProtocol;
  let burnProtocol: TripleBurnProtocol;
  let dividendSystem: AncestralDividendSystem;
  let consensus: GeometricConsensus;
  let economy: SelfOrganizingEconomy;
  let contract: FractalSmartContract;
  let oracleSystem: OracleTriangleSystem;
  let governance: NetworkGovernance;
  let svm: SierpinskiVirtualMachine;

  beforeEach(() => {
    genesisTriangle = new GenesisTriangle();
    quantumStates = new QuantumTriangleStates();
    smp = new SierpinskiMiningProtocol();
    burnProtocol = new TripleBurnProtocol();
    dividendSystem = new AncestralDividendSystem();
    consensus = new GeometricConsensus();
    economy = new SelfOrganizingEconomy();
    contract = new FractalSmartContract({ balance: 1000 });
    oracleSystem = new OracleTriangleSystem();
    governance = new NetworkGovernance();
    svm = new SierpinskiVirtualMachine();
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
    contract.registerFunction('transfer', (state: any, amount: number) => {
      if (amount > state.balance) throw new Error('Insufficient balance');
      return { ...state, balance: state.balance - amount };
    });
    expect(() => contract.executeFunction('transfer', 2000)).toThrow('Insufficient balance');
    const newState = contract.executeFunction('transfer', 500);
    expect(newState.balance).toBe(500);
  });

  it('should handle oracle data updates and listeners', async () => {
    let updateReceived = false;
    oracleSystem.onOracleDataUpdate('TestSource', (data: any) => {
      updateReceived = true;
      expect(data).toHaveProperty('price');
    });
    await oracleSystem.fetchOracleData('TestSource');
    expect(updateReceived).toBe(true);
  });

  it('should handle governance multiple proposals and votes', () => {
    governance.createProposal('p1', 'Proposal 1');
    governance.createProposal('p2', 'Proposal 2');
    governance.castVote('p1', 'voter1', 10);
    governance.castVote('p2', 'voter1', 5);
    governance.castVote('p1', 'voter2', 15);
    expect(governance.getTotalVotes('p1')).toBe(25);
    expect(governance.getTotalVotes('p2')).toBe(5);
    expect(governance.proposalPassed('p1', 0.5)).toBe(true);
    expect(governance.proposalPassed('p2', 0.5)).toBe(false);
  });

  it('should handle SVM contract function registration and execution errors', () => {
    svm.deployContract('c1', { balance: 1000 });
    expect(() => svm.executeContractFunction('c1', 'nonexistent')).toThrow();
    expect(() => svm.registerContractFunction('nonexistent', 'func', () => ({}))).toThrow();
  });
});
