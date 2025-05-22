// fractalCoordinateSystem.ts
// Extended fractal coordinate system and ledger segment management for SMLP

export class FractalCoordinateSystem {
  // Calculate coordinates for fractal ledger segments at a given level
  static calculateCoordinates(level: number): Array<{ x: number; y: number; segmentId: string }> {
    if (level < 0) {
      throw new Error("Level must be non-negative");
    }
    if (level === 0) {
      return [{ x: 0, y: 0, segmentId: "root" }];
    }

    const prevCoords = FractalCoordinateSystem.calculateCoordinates(level - 1);
    const newCoords: Array<{ x: number; y: number; segmentId: string }> = [];

    for (const coord of prevCoords) {
      const size = Math.pow(2, level - 1);
      newCoords.push({ x: coord.x, y: coord.y, segmentId: coord.segmentId + "0" }); // bottom-left
      newCoords.push({ x: coord.x + size, y: coord.y, segmentId: coord.segmentId + "1" }); // bottom-right
      newCoords.push({ x: coord.x + size / 2, y: coord.y + size * Math.sqrt(3) / 2, segmentId: coord.segmentId + "2" }); // top
    }

    return newCoords;
  }

  // Manage ledger segments by segmentId
  static getSegmentById(segments: Array<{ segmentId: string }>, id: string) {
    return segments.find(segment => segment.segmentId === id);
  }
}
