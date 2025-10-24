import { FederatedPointerEvent, Graphics } from "pixi.js";
import { GRAVITY, HEIGHT, SHAPE_HEIGHT, WIDTH } from "../constants";

enum ShapeType {
  CIRCLE = "CIRCLE",
  ELLIPSE = "ELLIPSE",
  STAR = "STAR",
  TRIANGLE = "TRIANGLE",
  SQUARE = "SQUARE",
  PENTAGON = "PENTAGON",
  HEXAGON = "HEXAGON",
}

type ShapeColor = `#${string}`;

type ShapePosition = { x: number; y: number };

class Shape {
  private graphics: Graphics;
  private velocityY: number = 0;
  private gravity: number = GRAVITY;

  constructor(type?: ShapeType, color?: ShapeColor, position?: ShapePosition) {
    this.graphics = new Graphics();
    this.drawShape(type, color, position);
  }

  public getGraphics(): Graphics {
    return this.graphics;
  }

  public update(deltaTime: number) {
    this.velocityY += this.gravity * deltaTime;
    this.graphics.y += this.velocityY * deltaTime;
  }

  public isOffScreen(): boolean {
    return this.graphics.y > HEIGHT + SHAPE_HEIGHT * 2;
  }

  public setOnClick(callback: () => void) {
    this.graphics.interactive = true;
    this.graphics.cursor = "pointer";

    this.graphics.on("pointerdown", (event: FederatedPointerEvent) => {
      event.stopPropagation();
      callback();
    });
  }

  public destroy() {
    this.graphics.removeAllListeners();
    this.graphics.destroy();
  }

  private generateRandomColor(): ShapeColor {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

    return `#${randomColor}`;
  }

  private getRandomType(): ShapeType {
    const types = Object.values(ShapeType);
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private randomPosition() {
    const x = Math.random() * WIDTH;
    const y = -SHAPE_HEIGHT;

    return { x, y };
  }

  private drawCircle(x: number, y: number) {
    this.graphics.circle(x, y, SHAPE_HEIGHT);
  }

  private drawEllipse(x: number, y: number) {
    this.graphics.ellipse(x, y, SHAPE_HEIGHT, 25);
  }

  private drawStar(x: number, y: number) {
    this.graphics.star(x, y, SHAPE_HEIGHT, 25, 10);
  }

  private drawPolygon(x: number, y: number, sides: number) {
    const points: number[] = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      points.push(x + SHAPE_HEIGHT * Math.cos(angle));
      points.push(y + SHAPE_HEIGHT * Math.sin(angle));
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

  private drawShape(
    type?: ShapeType,
    color?: ShapeColor,
    position?: ShapePosition
  ) {
    const { x, y } = position || this.randomPosition();

    if (!type) {
      type = this.getRandomType();
    }

    switch (type) {
      case ShapeType.CIRCLE:
        this.drawCircle(x, y);
        break;
      case ShapeType.ELLIPSE:
        this.drawEllipse(x, y);
        break;
      case ShapeType.STAR:
        this.drawStar(x, y);
        break;
      case ShapeType.TRIANGLE:
        this.drawTriangle(x, y);
        break;
      case ShapeType.SQUARE:
        this.drawSquare(x, y);
        break;
      case ShapeType.PENTAGON:
        this.drawPentagon(x, y);
        break;
      case ShapeType.HEXAGON:
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

export type { ShapeColor, ShapePosition };
export { Shape, ShapeType };
