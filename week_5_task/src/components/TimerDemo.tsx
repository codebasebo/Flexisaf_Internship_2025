import { useState, useEffect } from 'react'

/**
 * Timer Demo - Demonstrates useEffect hook
 * Shows component lifecycle, side effects, and cleanup
 */
function TimerDemo() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    // Cleanup function - runs when component unmounts or before re-running effect
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning]) // Effect runs when isRunning changes

  const toggle = () => setIsRunning(!isRunning)
  const reset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="demo-card">
      <h2>⏱️ useEffect: Timer</h2>
      <p>Side effects with intervals and cleanup</p>

      <div className="timer-display">{formatTime(seconds)}</div>

      <div className="button-group">
        <button onClick={toggle}>
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button onClick={reset}>🔄 Reset</button>
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p>
          Status: <strong>{isRunning ? 'Running' : 'Stopped'}</strong>
        </p>
      </div>
    </div>
  )
}

export default TimerDemo
