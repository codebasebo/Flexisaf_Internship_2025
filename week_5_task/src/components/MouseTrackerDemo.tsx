import { useMousePosition } from '../hooks/useCustomHooks'

/**
 * Mouse Tracker Demo - Demonstrates custom hook (useMousePosition)
 * Uses useState and useEffect internally to track mouse movement
 */
function MouseTrackerDemo() {
  const position = useMousePosition()

  return (
    <div className="demo-card">
      <h2>🖱️ Custom Hook: Mouse Tracker</h2>
      <p>Track mouse position using a custom hook</p>

      <div className="mouse-tracker">
        <h4>Move your mouse!</h4>
        <p>X Position: {position.x}px</p>
        <p>Y Position: {position.y}px</p>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
        <p>
          <strong>Custom Hook Used:</strong> <code>useMousePosition()</code>
        </p>
        <p>
          This hook encapsulates useState and useEffect to track mouse
          coordinates across the entire window.
        </p>
      </div>
    </div>
  )
}

export default MouseTrackerDemo
