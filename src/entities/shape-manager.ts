import { Container } from "pixi.js";
import { Shape } from "./shape";

class ShapeManager {
  private shapes: Shape[] = [];
  private container: Container;
  private spawnInterval: number = 1000;
  private lastSpawnTime: number = 0;

  constructor(container: Container) {
    this.container = container;
  }

  private spawnShape() {
    const shape = new Shape();
    this.shapes.push(shape);
    this.container.addChild(shape.getGraphics());
  }

  public update(deltaTime: number) {
    const currentTime = Date.now();

    if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
      this.spawnShape();
      this.lastSpawnTime = currentTime;
    }

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.update(deltaTime);

      if (shape.isOffScreen()) {
        this.container.removeChild(shape.getGraphics());
        shape.getGraphics().destroy();
        this.shapes.splice(i, 1);
      }
    }
  }
}

export { ShapeManager };
