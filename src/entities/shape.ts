import { FederatedPointerEvent, Graphics } from "pixi.js";
import { HEIGHT, SHAPE_SIZE, WIDTH } from "../constants";

enum EShapeType {
  CIRCLE = "CIRCLE",
  ELLIPSE = "ELLIPSE",
  STAR = "STAR",
  TRIANGLE = "TRIANGLE",
  SQUARE = "SQUARE",
  PENTAGON = "PENTAGON",
  HEXAGON = "HEXAGON",
}

type TShapeColor = `#${string}`;

type TShapePosition = { x: number; y: number };

class Shape {
  private graphics: Graphics;
  private type: EShapeType;
  private area: number = 0;
  private velocityY: number = 0;

  constructor(
    type?: EShapeType,
    color?: TShapeColor,
    position?: TShapePosition
  ) {
    this.graphics = new Graphics();
    this.type = type || this.getRandomType();
    this.area = this.calculateArea();
    this.draw(color, position);

    console.log(this.type, this.area);
  }

  public getGraphics(): Graphics {
    return this.graphics;
  }

  public update(deltaTime: number, gravity: number) {
    this.velocityY += gravity * deltaTime;
    this.graphics.y += this.velocityY * deltaTime;
  }

  public resetVelocity(): void {
    this.velocityY = 0;
  }

  public isOffScreen(): boolean {
    return this.graphics.y > HEIGHT + SHAPE_SIZE * 2;
  }

  public setOnClick(callback: () => void) {
    this.graphics.interactive = true;
    this.graphics.cursor = "pointer";

    this.graphics.on("pointerdown", (event: FederatedPointerEvent) => {
      event.stopPropagation();
      callback();
    });
  }

  private calculateArea(): number {
    switch (this.type) {
      case EShapeType.CIRCLE:
        return Math.PI * SHAPE_SIZE * SHAPE_SIZE;
      case EShapeType.ELLIPSE:
        return Math.PI * SHAPE_SIZE * (SHAPE_SIZE / 2);
      case EShapeType.STAR:
        return 5 * SHAPE_SIZE * SHAPE_SIZE * 0.5 * Math.sin(Math.PI / 5);
      case EShapeType.TRIANGLE:
        return (3 / 2) * SHAPE_SIZE * SHAPE_SIZE * Math.sin((2 * Math.PI) / 3);
      case EShapeType.SQUARE:
        return 2 * SHAPE_SIZE * SHAPE_SIZE;
      case EShapeType.PENTAGON:
        return (5 / 2) * SHAPE_SIZE * SHAPE_SIZE * Math.sin((2 * Math.PI) / 5);
      case EShapeType.HEXAGON:
        return ((3 * Math.sqrt(3)) / 2) * SHAPE_SIZE * SHAPE_SIZE;
      default:
        return 0;
    }
  }

  public getArea(): number {
    return this.area;
  }

  public destroy() {
    this.graphics.removeAllListeners();
    this.graphics.destroy();
  }

  private generateRandomColor(): TShapeColor {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

    return `#${randomColor}` as TShapeColor;
  }

  private getRandomType(): EShapeType {
    const types = Object.values(EShapeType);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private randomPosition() {
    const x = Math.random() * WIDTH;
    const y = -SHAPE_SIZE;

    return { x, y };
  }

  private drawCircle(x: number, y: number) {
    this.graphics.circle(x, y, SHAPE_SIZE);
  }

  private drawEllipse(x: number, y: number) {
    this.graphics.ellipse(x, y, SHAPE_SIZE, 25);
  }

  private drawStar(x: number, y: number) {
    this.graphics.star(x, y, 5, SHAPE_SIZE, SHAPE_SIZE * 0.5);
  }

  private drawPolygon(x: number, y: number, sides: number) {
    const points: number[] = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      points.push(x + SHAPE_SIZE * Math.cos(angle));
      points.push(y + SHAPE_SIZE * Math.sin(angle));
    }

    this.graphics.poly(points);
  }

  private drawTriangle(x: number, y: number) {
    this.drawPolygon(x, y, 3);
  }

  private drawSquare(x: number, y: number) {
    this.drawPolygon(x, y, 4);
  }

  private drawPentagon(x: number, y: number) {
    this.drawPolygon(x, y, 5);
  }

  private drawHexagon(x: number, y: number) {
    this.drawPolygon(x, y, 6);
  }

  private draw(color?: TShapeColor, position?: TShapePosition) {
    const { x, y } = position || this.randomPosition();

    switch (this.type) {
      case EShapeType.CIRCLE:
        this.drawCircle(x, y);
        break;
      case EShapeType.ELLIPSE:
        this.drawEllipse(x, y);
        break;
      case EShapeType.STAR:
        this.drawStar(x, y);
        break;
      case EShapeType.TRIANGLE:
        this.drawTriangle(x, y);
        break;
      case EShapeType.SQUARE:
        this.drawSquare(x, y);
        break;
      case EShapeType.PENTAGON:
        this.drawPentagon(x, y);
        break;
      case EShapeType.HEXAGON:
        this.drawHexagon(x, y);
        break;
      default:
        break;
    }

    this.graphics.fill({
      color: color || this.generateRandomColor(),
    });
  }
}

export type { TShapeColor, TShapePosition };
export { Shape, EShapeType };
