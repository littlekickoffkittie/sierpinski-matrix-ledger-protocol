// main.ts
// Main entry point for the Sierpinski Matrix Ledger Protocol (SMLP) implementation

import { FractalGeometryExtended } from '../core/fractalGeometryExtended';
import { GenesisTriangle } from '../core/genesisTriangle';
import { SierpinskiMiningProtocol } from '../core/sierpinskiMiningProtocol';

console.log("Sierpinski Matrix Ledger Protocol (SMLP) - Initializing...");

async function main() {
  console.log("Starting SMLP protocol implementation...");

  // Log fractal geometry principles
  const principles = FractalGeometryExtended.describeFractalGeometryPrinciples();
  console.log("Fractal Geometry Principles:\n", principles);

  // Initialize and demonstrate Genesis Triangle
  const genesisTriangle = new GenesisTriangle();
  genesisTriangle.initializeQuantumState();

  console.log("Genesis Triangle DNA Code:", genesisTriangle.getDnaCode());
  console.log("Total SERP Token Supply:", genesisTriangle.getTotalSupply());
  console.log("Initial Quantum State:", genesisTriangle.getQuantumState());

  // Simulate collapsing quantum state to a definite state
  const collapsedState = { stateId: 1, description: "Initial ledger state" };
  genesisTriangle.collapseQuantumState(collapsedState);

  console.log("Collapsed Quantum State:", genesisTriangle.getQuantumState());

  // Initialize and demonstrate Sierpinski Mining Protocol
  const smp = new SierpinskiMiningProtocol();
  console.log("Token Allocation:", smp.allocateTokens());

  // Additional implementation will proceed here
}

main().catch((error) => {
  console.error("Error during SMLP protocol execution:", error);
  process.exit(1);
});
