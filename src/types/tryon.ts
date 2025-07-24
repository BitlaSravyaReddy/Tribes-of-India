export interface TribalItem {
  id: string;
  name: string;
  type: 'necklace' | 'dress';
  imagePath: string;
  defaultPosition: { x: number; y: number };
  defaultScale: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface OverlayState {
  position: Position;
  scale: number;
  isDragging: boolean;
}
