import { Container } from "pixi.js";
import { Shape, TShapePosition } from "./shape";

class ShapeManager {
  private shapes: Shape[] = [];
  private container: Container;
  private spawnInterval: number = 1;
  private timeAccumulator: number = 0;

  constructor(container: Container) {
    this.container = container;
  }

  public update(deltaTime: number) {
    const deltaSeconds = deltaTime / 60;
    this.timeAccumulator += deltaSeconds;

    if (this.timeAccumulator >= this.spawnInterval) {
      this.spawn();
      this.timeAccumulator -= this.spawnInterval;
    }

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.update(deltaTime);

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
