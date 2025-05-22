// livingMatrix.ts
// Implementation of the living matrix concept and its data structures with real-time updates for SMLP

import { QuantumTriangleStates, TriangleState } from './quantumTriangleStates';

export class LivingMatrix {
  private quantumStates: QuantumTriangleStates;

  constructor() {
    this.quantumStates = new QuantumTriangleStates();
  }

  // Initialize the living matrix at a given fractal level
  initialize(level: number) {
    this.quantumStates.initializeStates(level);
  }

  // Update the state of a triangle segment in real-time
  updateTriangleState(segmentId: string, newState: any) {
    this.quantumStates.collapseState(segmentId, newState);
  }

  // Get the current state of a triangle segment
  getTriangleState(segmentId: string): TriangleState | undefined {
    return this.quantumStates.getState(segmentId);
  }

  // Get all triangle states
  getAllTriangleStates(): TriangleState[] {
    return this.quantumStates.getAllStates();
  }
}
