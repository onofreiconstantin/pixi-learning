interface IStatsDisplay {
  updateShapeCount(count: number): void;
  updateSurfaceArea(area: number): void;
  update(shapeCount: number, surfaceArea: number): void;
  destroy(): void;
}

export type { IStatsDisplay };
