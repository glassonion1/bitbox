// Companion Object Pattern
export const Keyboard = {
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Up: 'ArrowUp'
} as const
export type Keyboard = (typeof Keyboard)[keyof typeof Keyboard]

export interface State {
  update(delta: number, key: string): void
}

export interface Renderer {
  blockWidth: number
  state: State
  draw(ctx: CanvasRenderingContext2D): void
}
