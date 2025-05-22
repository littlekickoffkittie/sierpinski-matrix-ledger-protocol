// sierpinskiVirtualMachine.ts
// Implementation of the Sierpinski Virtual Machine (SVM) for executing fractal smart contracts and managing fractal ledger state

import { FractalSmartContract, ContractState } from '../smartContracts/fractalSmartContracts';

export class SierpinskiVirtualMachine {
  private contracts: Map<string, FractalSmartContract>;
  private ledgerState: Map<string, ContractState>;

  constructor() {
    this.contracts = new Map();
    this.ledgerState = new Map();
  }

  // Deploy a new contract with an ID and initial state
  deployContract(contractId: string, initialState: ContractState = {}): void {
    if (this.contracts.has(contractId)) {
      throw new Error(`Contract with ID ${contractId} already deployed`);
    }
    const contract = new FractalSmartContract(initialState);
    this.contracts.set(contractId, contract);
    this.ledgerState.set(contractId, initialState);
  }

  // Execute a function on a deployed contract
  executeContractFunction(contractId: string, functionName: string, ...args: any[]): ContractState {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error(`Contract with ID ${contractId} not found`);
    }
    const newState = contract.executeFunction(functionName, ...args);
    this.ledgerState.set(contractId, newState);
    return newState;
  }

  // Register a function on a deployed contract
  registerContractFunction(contractId: string, functionName: string, func: (...args: any[]) => ContractState): void {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error(`Contract with ID ${contractId} not found`);
    }
    contract.registerFunction(functionName, func);
  }

  // Get the current state of a contract
  getContractState(contractId: string): ContractState | undefined {
    return this.ledgerState.get(contractId);
  }

  // List all deployed contracts
  listContracts(): string[] {
    return Array.from(this.contracts.keys());
  }
}
