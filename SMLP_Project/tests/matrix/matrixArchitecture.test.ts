import { describe, it, expect, beforeEach } from 'vitest';
import { QuantumTriangleStates } from '../../src/matrix/quantumTriangleStates';
import { FractalCoordinateSystem } from '../../src/matrix/fractalCoordinateSystem';
import { LivingMatrix } from '../../src/matrix/livingMatrix';

describe('Matrix Architecture Components', () => {
  let quantumStates;
  let livingMatrix;

  beforeEach(() => {
    quantumStates = new QuantumTriangleStates();
    livingMatrix = new LivingMatrix();
  });

  it('should initialize quantum states for a given fractal level', () => {
    quantumStates.initializeStates(1);
    const states = quantumStates.getAllStates();
    expect(states.length).toBeGreaterThan(0);
    for (const state of states) {
      expect(state.quantumState).toBe('superposition');
    }
  });

  it('should collapse a quantum state correctly', () => {
    quantumStates.initializeStates(1);
    const states = quantumStates.getAllStates();
    const segmentId = states[0].segmentId;
    quantumStates.collapseState(segmentId, { stateId: 1, description: 'Test collapse' });
    const state = quantumStates.getState(segmentId);
    expect(state?.quantumState).toBe('collapsed');
    expect(state?.currentState).toEqual({ stateId: 1, description: 'Test collapse' });
  });

  it('should calculate fractal coordinates correctly', () => {
    const coords = FractalCoordinateSystem.calculateCoordinates(1);
    expect(coords.length).toBe(3);
    expect(coords[0].segmentId).toBe('root0');
    expect(coords[1].segmentId).toBe('root1');
    expect(coords[2].segmentId).toBe('root2');
  });

  it('should initialize living matrix and update triangle state', () => {
    livingMatrix.initialize(1);
    const statesBefore = livingMatrix.getAllTriangleStates();
    expect(statesBefore.length).toBeGreaterThan(0);

    const segmentId = statesBefore[0].segmentId;
    livingMatrix.updateTriangleState(segmentId, { stateId: 2, description: 'Updated state' });
    const updatedState = livingMatrix.getTriangleState(segmentId);
    expect(updatedState?.quantumState).toBe('collapsed');
    expect(updatedState?.currentState).toEqual({ stateId: 2, description: 'Updated state' });
  });
});
