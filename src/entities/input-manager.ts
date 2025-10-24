import { Container, FederatedPointerEvent } from "pixi.js";
import { ShapeManager } from "./shape-manager";

class InputManager {
  private container: Container;
  private shapesManager: ShapeManager;

  constructor(container: Container, shapesManager: ShapeManager) {
    this.container = container;
    this.shapesManager = shapesManager;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.container.interactive = true;
    this.container.hitArea = {
      contains() {
        return true;
      },
    };

    this.container.on("pointerdown", this.handleClick.bind(this));
  }

  private handleClick(event: FederatedPointerEvent) {
    const { x, y } = event.getLocalPosition(this.container);

    this.shapesManager.spawn({
      x,
      y,
    });
  }
}

export { InputManager };
