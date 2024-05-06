import { useRef, useEffect } from 'react'
import { Renderer } from './types'

export const useCanvas = (
  blockSizeX: number,
  blockSizeY: number,
  renderer: Renderer
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pause = useRef<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const displayWidth = canvas.clientWidth
    const blockWidth = Math.floor(displayWidth / blockSizeX)
    const displayHeight = blockWidth * blockSizeY

    const { devicePixelRatio: ratio = 1 } = window

    canvas.width = displayWidth * ratio
    canvas.height = displayHeight * ratio
    ctx.scale(ratio, ratio)

    // desired interval is 60fps
    const interval = 1000.0 / 60
    let lastTime = 0

    let animationFrameId = 0
    let pressedKey = ''

    const gameLoop = (now: number) => {
      if (!lastTime) {
        lastTime = now
      }

      if (!pause.current) {
        let delta = Math.floor(now - lastTime)

        // Frame skipping
        while (delta >= 0) {
          const diff = delta - interval
          renderer.state.update(diff >= 0 ? interval : delta, pressedKey)
          pressedKey = ''
          delta = diff
        }

        renderer.blockWidth = blockWidth
        renderer.draw(ctx)
      }

      lastTime = now
      animationFrameId = window.requestAnimationFrame(gameLoop)
    }
    window.requestAnimationFrame(gameLoop)

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      pressedKey = e.key
    }

    document.addEventListener('keydown', handleKeyDown, false)
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [blockSizeX, blockSizeY, renderer])

  const togglePausing = () => {
    pause.current = !pause.current
  }

  return { canvasRef, togglePausing }
}
