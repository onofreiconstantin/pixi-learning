import { HtmlStats } from "../../entities/html-stats";
import { PixiStats } from "../../entities/pixi-stats";
import { IStatsDisplay } from "./stats-display";

export enum EStatsType {
  HTML = "HTML",
  PIXI = "PIXI",
}

class StatsFactory {
  public static create(type: EStatsType): IStatsDisplay {
    switch (type) {
      case EStatsType.HTML:
        return new HtmlStats();
      case EStatsType.PIXI:
        return new PixiStats();
      default:
        return new HtmlStats();
    }
  }
}

export { StatsFactory };
