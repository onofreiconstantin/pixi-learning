import { GRAVITY } from "../constants";

class GameControls {
  private container: HTMLDivElement;
  private spawnRateValue: HTMLSpanElement;
  private gravityValue: HTMLSpanElement;
  private onSpawnRateChange: (rate: number) => void;
  private onGravityChange: (gravity: number) => void;

  private currentSpawnRate: number;
  private currentGravity: number;

  constructor(
    onSpawnRateChange: (rate: number) => void,
    onGravityChange: (gravity: number) => void,
    initialSpawnRate: number = 1,
    initialGravity: number = GRAVITY,
  ) {
    this.onSpawnRateChange = onSpawnRateChange;
    this.onGravityChange = onGravityChange;
    this.currentSpawnRate = initialSpawnRate;
    this.currentGravity = initialGravity;

    this.container = document.createElement("div");
    this.spawnRateValue = document.createElement("span");
    this.gravityValue = document.createElement("span");

    this.createControls();
  }

  private createControls(): void {
    this.container.classList.add("controls-container");

    const spawnRateControl = this.createControl(
      "Shapes/sec:",
      this.currentSpawnRate.toString(),
      () => this.decreaseSpawnRate(),
      () => this.increaseSpawnRate(),
    );
    this.spawnRateValue = spawnRateControl.valueElement;

    const gravityControl = this.createControl(
      "Gravity:",
      this.currentGravity.toFixed(2),
      () => this.decreaseGravity(),
      () => this.increaseGravity(),
    );
    this.gravityValue = gravityControl.valueElement;

    this.container.appendChild(spawnRateControl.element);
    this.container.appendChild(gravityControl.element);

    document.body.appendChild(this.container);
  }

  private createControl(
    label: string,
    initialValue: string,
    onDecrease: () => void,
    onIncrease: () => void,
  ): { element: HTMLDivElement; valueElement: HTMLSpanElement } {
    const controlDiv = document.createElement("div");
    controlDiv.classList.add("controls-item");

    const labelSpan = document.createElement("span");
    labelSpan.textContent = label;

    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";
    decreaseBtn.addEventListener("click", onDecrease);

    const valueSpan = document.createElement("span");
    valueSpan.textContent = initialValue;

    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", onIncrease);

    controlDiv.appendChild(labelSpan);
    controlDiv.appendChild(decreaseBtn);
    controlDiv.appendChild(valueSpan);
    controlDiv.appendChild(increaseBtn);

    return { element: controlDiv, valueElement: valueSpan };
  }

  private roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
  }

  private increaseSpawnRate(): void {
    this.currentSpawnRate = Math.min(100, this.currentSpawnRate + 1);
    this.spawnRateValue.textContent = this.currentSpawnRate.toString();
    this.onSpawnRateChange(this.currentSpawnRate);
  }

  private decreaseSpawnRate(): void {
    this.currentSpawnRate = Math.max(0, this.currentSpawnRate - 1);
    this.spawnRateValue.textContent = this.currentSpawnRate.toString();
    this.onSpawnRateChange(this.currentSpawnRate);
  }

  private increaseGravity(): void {
    this.currentGravity = this.roundToDecimals(
      Math.min(5, this.currentGravity + 0.05),
      2,
    );
    this.gravityValue.textContent = this.currentGravity.toFixed(2);
    this.onGravityChange(this.currentGravity);
  }

  private decreaseGravity(): void {
    this.currentGravity = this.roundToDecimals(
      Math.max(0, this.currentGravity - 0.05),
      2,
    );
    this.gravityValue.textContent = this.currentGravity.toFixed(2);
    this.onGravityChange(this.currentGravity);
  }

  public destroy(): void {
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
  }
}

export { GameControls };
