export interface Blip {
  name: string;
  quadrant: number;
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
  rings?: number;
  ringLabels?: string[];
  quadrantLabels?: string[];
  colors?: string[];
  animationDuration?: number;
}

export interface ActiveFilters {
  quadrants: number[];
  rings: number[];
}

export interface QuadrantPosition {
  x: number;
  y: number;
}
