import { Container } from "pixi.js";
import { Shape, TShapePosition } from "./shape";
import { GRAVITY } from "../constants";

class ShapeManager {
  private shapes: Shape[] = [];
  private container: Container;
  private spawnRate: number = 1;
  private timeAccumulator: number = 0;
  private gravity: number = GRAVITY;

  constructor(container: Container) {
    this.container = container;
  }

  public update(deltaTime: number) {
    const deltaSeconds = deltaTime / 60;

    if (this.spawnRate > 0) {
      this.timeAccumulator += deltaSeconds;
      const spawnInterval = 1 / this.spawnRate;

      while (this.timeAccumulator >= spawnInterval) {
        this.spawn();
        this.timeAccumulator -= spawnInterval;
      }
    }
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.update(deltaTime, this.gravity);

      if (shape.isOffScreen()) {
        this.remove(shape);
      }
    }
  }

  public spawn(position?: TShapePosition) {
    const shape = new Shape(undefined, undefined, position);
    shape.setOnClick(() => {
      this.remove(shape);
    });
    this.shapes.push(shape);
    this.container.addChild(shape.getGraphics());
  }

  public setSpawnRate(shapesPerSecond: number): void {
    this.spawnRate = shapesPerSecond;
    if (shapesPerSecond === 0) {
      this.timeAccumulator = 0;
    }
  }

  public setGravity(gravity: number): void {
    this.gravity = gravity;

    if (gravity === 0) {
      this.shapes.forEach((shape) => shape.resetVelocity());
    }
  }

  public getShapesCount() {
    return this.shapes.length;
  }

  public getTotalArea(): number {
    return this.shapes.reduce((acc, shape) => acc + shape.getArea(), 0);
  }

  private remove(shape: Shape) {
    this.container.removeChild(shape.getGraphics());
    shape.destroy();

    const index = this.shapes.indexOf(shape);
    this.shapes.splice(index, 1);
  }
}

export { ShapeManager };
