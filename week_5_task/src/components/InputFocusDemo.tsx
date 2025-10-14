import { useState, useRef, useEffect } from 'react'

/**
 * Input Focus Demo - Demonstrates useRef hook
 * Shows DOM manipulation and persisting values between renders
 */
function InputFocusDemo() {
  const [name, setName] = useState('')
  const [renderCount, setRenderCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCountRef = useRef(0)

  // This effect runs on every render
  useEffect(() => {
    renderCountRef.current += 1
  })

  const focusInput = () => {
    // Direct DOM manipulation using ref
    inputRef.current?.focus()
  }

  const clearInput = () => {
    setName('')
    inputRef.current?.focus()
  }

  return (
    <div className="demo-card">
      <h2>🎯 useRef: Input Focus & Render Count</h2>
      <p>Direct DOM access and persisting values without re-renders</p>

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button onClick={focusInput}>🎯 Focus Input</button>
        <button onClick={clearInput}>🧹 Clear</button>
        <button onClick={() => setRenderCount(renderCount + 1)}>
          🔄 Force Re-render
        </button>
      </div>

      <div className="input-display">
        <p>
          <strong>Name:</strong> {name || '(empty)'}
        </p>
        <p>
          <strong>Component Render Count (useRef):</strong>{' '}
          {renderCountRef.current}
        </p>
        <p>
          <strong>State-based Render Count:</strong> {renderCount}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
          Notice: useRef doesn't trigger re-renders when updated!
        </p>
      </div>
    </div>
  )
}

export default InputFocusDemo
