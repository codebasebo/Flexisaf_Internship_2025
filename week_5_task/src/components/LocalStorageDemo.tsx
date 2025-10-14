import { useLocalStorage } from '../hooks/useCustomHooks'

/**
 * Local Storage Demo - Demonstrates custom hook (useLocalStorage)
 * Persists state to browser's localStorage
 */
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('user-name', '')
  const [count, setCount] = useLocalStorage('visit-count', 0)

  const incrementCount = () => setCount(count + 1)
  const resetAll = () => {
    setName('')
    setCount(0)
  }

  return (
    <div className="demo-card">
      <h2>💾 Custom Hook: Local Storage</h2>
      <p>Persist state across browser sessions</p>

      <div className="local-storage-demo">
        <div>
          <label>
            <strong>Your Name:</strong>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="stored-value">
          <p>
            <strong>Stored Name:</strong> {name || '(not set)'}
          </p>
          <p>
            <strong>Visit Count:</strong> {count}
          </p>
        </div>

        <div className="button-group">
          <button onClick={incrementCount}>➕ Increment Count</button>
          <button onClick={resetAll}>🧹 Clear All</button>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
          <p>
            <strong>Custom Hook Used:</strong> <code>useLocalStorage()</code>
          </p>
          <p>
            Your data is saved to localStorage. Try refreshing the page - your
            values will persist!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LocalStorageDemo
