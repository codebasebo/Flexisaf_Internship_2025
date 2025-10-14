# Testing React Hooks

This guide shows how to test components and custom hooks using Vitest and React Testing Library.

## Setup

Already configured in this project:
- Vitest for test runner
- @testing-library/react for component testing
- @testing-library/jest-dom for DOM matchers

## Testing useState Components

### Counter Component Test
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CounterDemo from './CounterDemo'

describe('CounterDemo', () => {
  it('should increment counter', () => {
    render(<CounterDemo />)
    
    const button = screen.getByText(/Increase/i)
    fireEvent.click(button)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should reset counter', () => {
    render(<CounterDemo />)
    
    fireEvent.click(screen.getByText(/Increase/i))
    fireEvent.click(screen.getByText(/Reset/i))
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
```

## Testing useEffect Components

### Timer Component Test
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TimerDemo from './TimerDemo'

describe('TimerDemo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should start timer when play button is clicked', async () => {
    render(<TimerDemo />)
    
    fireEvent.click(screen.getByText(/Start/i))
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText(/00:00:01/)).toBeInTheDocument()
    })
  })

  it('should pause timer', async () => {
    render(<TimerDemo />)
    
    fireEvent.click(screen.getByText(/Start/i))
    vi.advanceTimersByTime(2000)
    fireEvent.click(screen.getByText(/Pause/i))
    
    const currentTime = screen.getByText(/00:00:02/)
    expect(currentTime).toBeInTheDocument()
  })
})
```

## Testing useRef Components

### Input Focus Test
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import InputFocusDemo from './InputFocusDemo'

describe('InputFocusDemo', () => {
  it('should focus input when button is clicked', () => {
    render(<InputFocusDemo />)
    
    const input = screen.getByPlaceholderText(/Enter your name/i)
    const focusButton = screen.getByText(/Focus Input/i)
    
    fireEvent.click(focusButton)
    
    expect(input).toHaveFocus()
  })

  it('should clear input value', () => {
    render(<InputFocusDemo />)
    
    const input = screen.getByPlaceholderText(/Enter your name/i)
    fireEvent.change(input, { target: { value: 'Test' } })
    
    expect(input).toHaveValue('Test')
    
    fireEvent.click(screen.getByText(/Clear/i))
    
    expect(input).toHaveValue('')
  })
})
```

## Testing Custom Hooks

### Using renderHook
```tsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useLocalStorage } from './useCustomHooks'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    )
    
    expect(result.current[0]).toBe('default')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    )
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test-key')).toBe('"updated"')
  })

  it('should load value from localStorage', () => {
    localStorage.setItem('test-key', '"stored-value"')
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default')
    )
    
    expect(result.current[0]).toBe('stored-value')
  })
})
```

### Testing useMousePosition
```tsx
import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMousePosition } from './useCustomHooks'

describe('useMousePosition', () => {
  it('should track mouse position', () => {
    const { result } = renderHook(() => useMousePosition())
    
    expect(result.current).toEqual({ x: 0, y: 0 })
    
    // Simulate mouse move
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 200
    })
    
    window.dispatchEvent(mouseMoveEvent)
    
    expect(result.current).toEqual({ x: 100, y: 200 })
  })

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    
    const { unmount } = renderHook(() => useMousePosition())
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    )
  })
})
```

### Testing useFetch
```tsx
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useFetch } from './useCustomHooks'

describe('useFetch', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test User' }
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    )
    
    const { result } = renderHook(() => 
      useFetch('https://api.example.com/user')
    )
    
    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it('should handle fetch errors', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    )
    
    const { result } = renderHook(() => 
      useFetch('https://api.example.com/user')
    )
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe('Network error')
  })

  it('should not update state if unmounted', async () => {
    const mockData = { id: 1, name: 'Test' }
    
    global.fetch = vi.fn(() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
          } as Response)
        }, 100)
      })
    )
    
    const { result, unmount } = renderHook(() => 
      useFetch('https://api.example.com/user')
    )
    
    unmount() // Unmount before fetch completes
    
    await waitFor(() => {
      // Should not throw error or update state
      expect(result.current.loading).toBe(true)
    })
  })
})
```

### Testing useDebounce
```tsx
import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from './useCustomHooks'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should debounce value', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    )
    
    expect(result.current).toBe('initial')
    
    // Update value
    rerender({ value: 'updated', delay: 500 })
    
    // Should still have old value
    expect(result.current).toBe('initial')
    
    // Fast forward time
    vi.advanceTimersByTime(500)
    
    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })

  it('should cancel previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 500 } }
    )
    
    rerender({ value: 'ab', delay: 500 })
    vi.advanceTimersByTime(100)
    
    rerender({ value: 'abc', delay: 500 })
    vi.advanceTimersByTime(100)
    
    rerender({ value: 'abcd', delay: 500 })
    
    // Fast forward full delay
    vi.advanceTimersByTime(500)
    
    await waitFor(() => {
      // Should only have the last value
      expect(result.current).toBe('abcd')
    })
  })
})
```

## Integration Tests

### Testing Component with Multiple Hooks
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FetchDataDemo from './FetchDataDemo'

describe('FetchDataDemo Integration', () => {
  it('should fetch and display user data', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com'
    }
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      } as Response)
    )
    
    render(<FetchDataDemo />)
    
    // Should show loading
    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument()
  })

  it('should handle navigation between users', async () => {
    const mockUser1 = { id: 1, name: 'User 1', email: 'user1@test.com' }
    const mockUser2 = { id: 2, name: 'User 2', email: 'user2@test.com' }
    
    global.fetch = vi.fn((url) => {
      const userId = url.split('/').pop()
      const user = userId === '1' ? mockUser1 : mockUser2
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(user),
      } as Response)
    })
    
    render(<FetchDataDemo />)
    
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument()
    })
    
    // Click next button
    fireEvent.click(screen.getByText(/Next/i))
    
    await waitFor(() => {
      expect(screen.getByText('User 2')).toBeInTheDocument()
    })
  })
})
```

## Best Practices for Testing Hooks

### 1. Test Behavior, Not Implementation
```tsx
// ❌ Bad: Testing internal state
expect(component.state.count).toBe(1)

// ✅ Good: Testing what user sees
expect(screen.getByText('1')).toBeInTheDocument()
```

### 2. Use Proper Async Utilities
```tsx
// ❌ Bad: Using setTimeout
setTimeout(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
}, 1000)

// ✅ Good: Using waitFor
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

### 3. Clean Up After Tests
```tsx
describe('MyComponent', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
})
```

### 4. Mock External Dependencies
```tsx
// Mock fetch
global.fetch = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test CounterDemo.test.tsx
```

## Test Coverage Goals

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

## Common Testing Patterns

### Testing Loading States
```tsx
it('should show loading state', () => {
  render(<MyComponent />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
})
```

### Testing Error States
```tsx
it('should show error message', async () => {
  global.fetch = vi.fn(() => Promise.reject(new Error('Failed')))
  
  render(<MyComponent />)
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
```

### Testing User Interactions
```tsx
it('should handle user input', () => {
  render(<MyComponent />)
  
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'test' } })
  
  expect(input).toHaveValue('test')
})
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Hooks](https://react-hooks-testing-library.com/)

---

**Remember: Good tests give you confidence to refactor! 🧪**
