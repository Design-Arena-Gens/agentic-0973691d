declare module 'react-draggable' {
  import * as React from 'react';

  export interface DraggableData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
  }

  export interface DraggableProps {
    axis?: 'both' | 'x' | 'y' | 'none';
    handle?: string;
    cancel?: string;
    disabled?: boolean;
    bounds?: string | { left?: number; top?: number; right?: number; bottom?: number } | false;
    position?: { x: number; y: number };
    defaultPosition?: { x: number; y: number };
    defaultClassName?: string;
    defaultClassNameDragging?: string;
    defaultClassNameDragged?: string;
    grid?: [number, number];
    scale?: number;
    positionOffset?: { x: number | string; y: number | string };
    enableUserSelectHack?: boolean;
    onStart?: (e: any, data: DraggableData) => void | false;
    onDrag?: (e: any, data: DraggableData) => void | false;
    onStop?: (e: any, data: DraggableData) => void | false;
    onMouseDown?: (e: MouseEvent) => void;
    children?: React.ReactNode;
    allowAnyClick?: boolean;
    allowMobileScroll?: boolean;
    offsetParent?: HTMLElement;
  }

  export default class Draggable extends React.Component<DraggableProps> {}
}
