import { useState } from 'react'
import { useFetch } from '../hooks/useCustomHooks'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

/**
 * Fetch Data Demo - Demonstrates custom hook (useFetch)
 * Handles async data fetching with loading and error states
 */
function FetchDataDemo() {
  const [userId, setUserId] = useState(1)
  const { data: user, loading, error } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  const loadRandomUser = () => {
    const randomId = Math.floor(Math.random() * 10) + 1
    setUserId(randomId)
  }

  return (
    <div className="demo-card">
      <h2>🌍 Custom Hook: Data Fetching</h2>
      <p>Fetch data from API with loading and error states</p>

      <div className="fetch-demo">
        <div className="button-group">
          <button onClick={() => setUserId(Math.max(1, userId - 1))}>
            ⬅️ Previous
          </button>
          <button onClick={loadRandomUser}>🎲 Random</button>
          <button onClick={() => setUserId(Math.min(10, userId + 1))}>
            ➡️ Next
          </button>
        </div>

        {loading && <div className="loading">⏳ Loading user data...</div>}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {user && !loading && (
          <div className="user-card">
            <h4>👤 {user.name}</h4>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
          </div>
        )}

        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
          <p>
            <strong>Custom Hook Used:</strong> <code>useFetch()</code>
          </p>
          <p>
            This hook handles async data fetching, loading states, error
            handling, and cleanup for cancelled requests.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <em>Data source: JSONPlaceholder API</em>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FetchDataDemo
