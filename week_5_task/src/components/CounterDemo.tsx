import { useState } from 'react'

/**
 * Counter Demo - Demonstrates useState hook
 * Shows basic state management with increment, decrement, and reset
 */
function CounterDemo() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const increment = () => setCount(count + step)
  const decrement = () => setCount(count - step)
  const reset = () => setCount(0)

  return (
    <div className="demo-card">
      <h2>📊 useState: Counter</h2>
      <p>Basic state management with multiple state variables</p>

      <div className="counter-display">{count}</div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Step: 
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: '80px', marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      <div className="button-group">
        <button onClick={decrement}>➖ Decrease</button>
        <button onClick={reset}>🔄 Reset</button>
        <button onClick={increment}>➕ Increase</button>
      </div>
    </div>
  )
}

export default CounterDemo
