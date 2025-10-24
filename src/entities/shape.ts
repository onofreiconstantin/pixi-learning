import { Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "../constants";

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

class Shape {
  private graphics: Graphics;
  private type: ShapeType;
  private color: ShapeColor;
  private velocityY: number = 0;
  private gravity: number = 0.25;

  constructor(type?: ShapeType, color?: ShapeColor) {
    this.graphics = new Graphics();
    this.type = type || this.getRandomType();
    this.color = color || this.generateRandomColor();
    this.drawShape();
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
    const y = -50;

    return { x, y };
  }

  private drawCircle(x: number, y: number) {
    this.graphics.circle(x, y, 50);
  }

  private drawEllipse(x: number, y: number) {
    this.graphics.ellipse(x, y, 50, 25);
  }

  private drawStar(x: number, y: number) {
    this.graphics.star(x, y, 50, 25, 10);
  }

  private drawPolygon(x: number, y: number, sides: number) {
    const points: number[] = [];

    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      points.push(x + 50 * Math.cos(angle));
      points.push(y + 50 * Math.sin(angle));
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

  private drawShape() {
    const { x, y } = this.randomPosition();

    switch (this.type) {
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
      color: this.color,
    });
  }

  public getGraphics(): Graphics {
    return this.graphics;
  }

  public update(deltaTime: number) {
    this.velocityY += this.gravity * deltaTime;
    this.graphics.y += this.velocityY * deltaTime;
  }

  public isOffScreen(): boolean {
    return this.graphics.y > HEIGHT + 100;
  }
}

export type { ShapeColor };
export { Shape, ShapeType };
