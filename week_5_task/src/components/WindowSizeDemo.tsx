import { useWindowSize } from '../hooks/useCustomHooks'

/**
 * Window Size Demo - Demonstrates custom hook (useWindowSize)
 * Tracks browser window dimensions dynamically
 */
function WindowSizeDemo() {
  const { width, height } = useWindowSize()

  const getDeviceType = () => {
    if (width < 768) return '📱 Mobile'
    if (width < 1024) return '📱 Tablet'
    return '💻 Desktop'
  }

  return (
    <div className="demo-card">
      <h2>📐 Custom Hook: Window Size</h2>
      <p>Track viewport dimensions in real-time</p>

      <div className="window-size">
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <p style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
          Device: {getDeviceType()}
        </p>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
        <p>
          <strong>Custom Hook Used:</strong> <code>useWindowSize()</code>
        </p>
        <p>
          Resize your browser window to see the dimensions update in real-time!
        </p>
      </div>
    </div>
  )
}

export default WindowSizeDemo
