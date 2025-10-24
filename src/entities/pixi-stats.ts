import { Container, Text, TextStyle } from "pixi.js";
import { IStatsDisplay } from "../interfaces/stats/stats-display";

class PixiStats implements IStatsDisplay {
  private container: Container;
  private shapeCountText: Text | null = null;
  private surfaceAreaText: Text | null = null;
  private textStyle: TextStyle | null = null;

  constructor() {
    this.container = new Container();
    this.createTexts();
  }

  public getContainer(): Container {
    return this.container;
  }

  private createTexts(): void {
    this.textStyle = new TextStyle({
      fontSize: 16,
      fill: "#FFFFFF",
      fontWeight: "bold",
    });

    this.shapeCountText = new Text({
      text: "Shapes: 0",
      style: this.textStyle,
    });

    this.shapeCountText.x = 10;
    this.shapeCountText.y = -25;

    this.container.addChild(this.shapeCountText);

    this.surfaceAreaText = new Text({
      text: "Surface Area: 0 px^2",
      style: this.textStyle,
    });

    this.surfaceAreaText.x = 105;
    this.surfaceAreaText.y = -25;

    this.container.addChild(this.surfaceAreaText);
  }

  public updateShapeCount(count: number): void {
    if (this.shapeCountText) {
      this.shapeCountText.text = `Shapes: ${count}`;
    }
  }

  public updateSurfaceArea(area: number): void {
    if (this.surfaceAreaText) {
      this.surfaceAreaText.text = `Surface Area: ${area.toLocaleString()} px^2`;
    }
  }

  public update(shapeCount: number, surfaceArea: number): void {
    this.updateShapeCount(shapeCount);
    this.updateSurfaceArea(surfaceArea);
  }

  public destroy(): void {
    if (this.shapeCountText) {
      this.shapeCountText.destroy();
    }
    if (this.surfaceAreaText) {
      this.surfaceAreaText.destroy();
    }
    this.container.destroy();
  }
}

export { PixiStats };
