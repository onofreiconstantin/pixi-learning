import { IStatsDisplay } from "../interfaces/stats/stats-display";

class HtmlStats implements IStatsDisplay {
  private container: HTMLDivElement | null = null;
  private shapeCountElement: HTMLSpanElement | null = null;
  private surfaceAreaElement: HTMLSpanElement | null = null;

  constructor() {
    this.createHTML();
  }

  private createHTML() {
    this.container = document.createElement("div");
    this.container.classList.add("stats-container");

    const shapeCountDiv = document.createElement("div");
    shapeCountDiv.classList.add("stats-item");

    shapeCountDiv.innerHTML =
      '<strong>Shapes:</strong> <span id="shape-count">0</span>';
    this.container.appendChild(shapeCountDiv);

    const surfaceAreaDiv = document.createElement("div");
    surfaceAreaDiv.classList.add("stats-item");

    surfaceAreaDiv.innerHTML =
      '<strong>Surface Area:</strong> <span id="surface-area">0</span> px^2';
    this.container.appendChild(surfaceAreaDiv);

    document.body.appendChild(this.container);

    this.shapeCountElement = document.getElementById(
      "shape-count"
    ) as HTMLSpanElement;
    this.surfaceAreaElement = document.getElementById(
      "surface-area"
    ) as HTMLSpanElement;
  }

  public updateShapeCount(count: number): void {
    if (this.shapeCountElement) {
      this.shapeCountElement.textContent = count.toString();
    }
  }

  public updateSurfaceArea(area: number): void {
    if (this.surfaceAreaElement) {
      this.surfaceAreaElement.textContent = area.toLocaleString();
    }
  }

  public update(shapeCount: number, surfaceArea: number): void {
    this.updateShapeCount(shapeCount);
    this.updateSurfaceArea(surfaceArea);
  }

  public destroy(): void {
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
    this.shapeCountElement = null;
    this.surfaceAreaElement = null;
  }
}

export { HtmlStats };
