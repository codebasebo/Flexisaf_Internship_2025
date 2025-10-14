import { useState } from 'react'
import { useDebounce } from '../hooks/useCustomHooks'

/**
 * Search Demo - Demonstrates useDebounce custom hook
 * Shows performance optimization for search inputs
 */
function SearchDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [searchCount, setSearchCount] = useState(0)

  // Simulate search whenever debounced value changes
  const performSearch = (term: string) => {
    setSearchCount((prev) => prev + 1)
    // In real app, this would be an API call
    console.log('Searching for:', term)
  }

  // This would trigger on every debounced change
  useState(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm)
    }
  })

  const items = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    'Mango', 'Orange', 'Papaya', 'Raspberry', 'Strawberry'
  ]

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )

  return (
    <div className="demo-card">
      <h2>🔍 Custom Hook: Debounced Search</h2>
      <p>Optimize performance with debounced values</p>

      <div>
        <input
          type="text"
          placeholder="Search fruits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          <strong>Current Input:</strong> {searchTerm || '(empty)'}
        </p>
        <p style={{ color: '#667eea', fontSize: '0.9rem' }}>
          <strong>Debounced Value (500ms):</strong> {debouncedSearchTerm || '(empty)'}
        </p>
        <p style={{ color: '#764ba2', fontSize: '0.9rem' }}>
          <strong>Search Count:</strong> {searchCount}
        </p>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          Results ({filteredItems.length}):
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '0.5rem'
        }}>
          {filteredItems.map((item) => (
            <div
              key={item}
              style={{
                padding: '0.5rem',
                background: '#f5f5f5',
                borderRadius: '6px',
                textAlign: 'center',
                border: '2px solid #667eea'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
        <p>
          <strong>Custom Hook Used:</strong> <code>useDebounce()</code>
        </p>
        <p>
          Notice how the "Debounced Value" only updates 500ms after you stop typing,
          reducing unnecessary searches and improving performance!
        </p>
      </div>
    </div>
  )
}

export default SearchDemo
