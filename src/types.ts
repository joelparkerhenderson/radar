export interface Blip {
  name: string;
  arc: number;
  ring: number;
}

export interface BlipWithPosition extends Blip {
  id: number;
  number: number;
  x: number;
  y: number;
  color: string;
}

export interface RadarConfig {
  width?: number;
  height?: number;
  arcs?: number;
  arcLabels?: string[];
  rings?: number;
  ringLabels?: string[];
  colors?: string[];
  animationDuration?: number;
}

export interface ActiveFilters {
  arcs: number[];
  rings: number[];
}

export interface ArcPosition {
  x: number;
  y: number;
}
