# React Hooks Implementation Guide

## Overview

This project demonstrates the comprehensive use of React Hooks through 8 interactive demos. Each demo showcases different hook patterns and best practices.

## 1. useState Hook - Counter Demo

### Purpose
Demonstrates basic state management with multiple state variables.

### Key Concepts
- Declaring state with `useState`
- Updating state with setter functions
- Managing multiple independent state variables
- Functional state updates for derived values

### Code Example
```tsx
const [count, setCount] = useState(0)
const [step, setStep] = useState(1)

const increment = () => setCount(count + step)
const decrement = () => setCount(count - step)
const reset = () => setCount(0)
```

### What You'll Learn
- How to initialize state with default values
- How state updates trigger re-renders
- How to work with multiple state variables
- How to create controlled form inputs

---

## 2. useEffect Hook - Timer Demo

### Purpose
Demonstrates side effects, component lifecycle, and cleanup functions.

### Key Concepts
- Running effects after render
- Dependency arrays for conditional execution
- Cleanup functions to prevent memory leaks
- Working with intervals and timers

### Code Example
```tsx
useEffect(() => {
  let interval: number | undefined

  if (isRunning) {
    interval = window.setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)
  }

  // Cleanup function
  return () => {
    if (interval) {
      clearInterval(interval)
    }
  }
}, [isRunning]) // Only re-run when isRunning changes
```

### What You'll Learn
- When effects run (after every render, conditionally, or once)
- How dependency arrays work
- Why cleanup functions are crucial
- How to prevent infinite loops

---

## 3. useRef Hook - Input Focus Demo

### Purpose
Demonstrates DOM manipulation and persisting values without causing re-renders.

### Key Concepts
- Accessing DOM elements directly
- Storing mutable values that persist across renders
- Differences between ref updates and state updates
- Imperative vs declarative programming

### Code Example
```tsx
const inputRef = useRef<HTMLInputElement>(null)
const renderCountRef = useRef(0)

// Access DOM element
const focusInput = () => {
  inputRef.current?.focus()
}

// Track renders without causing re-renders
useEffect(() => {
  renderCountRef.current += 1
})
```

### What You'll Learn
- How refs differ from state
- When to use refs vs state
- How to access DOM elements imperatively
- How to store values that shouldn't trigger re-renders

---

## 4. Custom Hook - useMousePosition

### Purpose
Track mouse coordinates across the entire window.

### Implementation
```tsx
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return position
}
```

### What You'll Learn
- How to extract reusable logic into custom hooks
- How to combine useState and useEffect
- Proper event listener cleanup
- Returning values from custom hooks

---

## 5. Custom Hook - useOnlineStatus

### Purpose
Monitor the browser's online/offline status.

### Implementation
```tsx
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
```

### What You'll Learn
- Working with browser APIs
- Managing multiple event listeners
- Real-time status monitoring
- Testing online/offline scenarios

---

## 6. Custom Hook - useWindowSize

### Purpose
Track viewport dimensions and respond to window resize events.

### Implementation
```tsx
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
```

### What You'll Learn
- Responsive design with JavaScript
- Window event handling
- Performance considerations with resize events
- Building adaptive UI components

---

## 7. Custom Hook - useLocalStorage

### Purpose
Persist state to browser's localStorage with automatic synchronization.

### Implementation
```tsx
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

### What You'll Learn
- Lazy initialization with useState
- Working with localStorage API
- Error handling in hooks
- TypeScript generics in hooks
- Creating hooks with familiar APIs

---

## 8. Custom Hook - useFetch

### Purpose
Handle async data fetching with loading and error states.

### Implementation
```tsx
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        
        if (isMounted) {
          setData(json)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}
```

### What You'll Learn
- Async operations in useEffect
- Race condition prevention
- Loading and error state patterns
- Request cancellation with cleanup
- TypeScript with async hooks

---

## 9. Custom Hook - useDebounce (Bonus)

### Purpose
Delay updating a value until after a specified delay.

### Implementation
```tsx
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

### What You'll Learn
- Performance optimization techniques
- Debouncing vs throttling
- Working with timeouts
- Search input optimization

---

## Best Practices Demonstrated

### 1. Hook Rules
- ✅ Only call hooks at the top level
- ✅ Only call hooks from React functions
- ✅ Custom hooks start with "use"

### 2. Effect Dependencies
- ✅ Always include all dependencies in the array
- ✅ Use empty array [] for mount-only effects
- ✅ Omit array to run after every render

### 3. Cleanup Functions
- ✅ Always cleanup event listeners
- ✅ Clear intervals and timeouts
- ✅ Cancel async operations

### 4. State Updates
- ✅ Use functional updates when new state depends on old state
- ✅ Don't mutate state directly
- ✅ Keep state minimal and derive values when possible

### 5. TypeScript Integration
- ✅ Type state variables explicitly
- ✅ Use generics for reusable hooks
- ✅ Type event handlers properly
- ✅ Use proper DOM element types for refs

---

## Common Pitfalls Avoided

### 1. Infinite Loops
```tsx
// ❌ Bad: Missing dependency array
useEffect(() => {
  setValue(value + 1)
})

// ✅ Good: Proper dependencies
useEffect(() => {
  // Effect logic
}, [dependency])
```

### 2. Stale Closures
```tsx
// ❌ Bad: Using stale value
setInterval(() => {
  setCount(count + 1)
}, 1000)

// ✅ Good: Functional update
setInterval(() => {
  setCount(prev => prev + 1)
}, 1000)
```

### 3. Memory Leaks
```tsx
// ❌ Bad: No cleanup
useEffect(() => {
  window.addEventListener('resize', handler)
})

// ✅ Good: Cleanup function
useEffect(() => {
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

### 4. Race Conditions
```tsx
// ❌ Bad: No cancellation
useEffect(() => {
  fetchData().then(setData)
}, [url])

// ✅ Good: Cancellation flag
useEffect(() => {
  let isMounted = true
  fetchData().then(data => {
    if (isMounted) setData(data)
  })
  return () => { isMounted = false }
}, [url])
```

---

## Testing Your Understanding

Try these exercises:

1. **Modify the Counter**: Add a "Multiply" button that doubles the count
2. **Enhance the Timer**: Add lap time recording functionality
3. **Improve Input Focus**: Add a character counter that updates in real-time
4. **Create New Hook**: Build a `useDebounce` hook for search inputs
5. **Add Dark Mode**: Create a `useTheme` hook with localStorage persistence

---

## Resources

- [React Hooks API Reference](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [Custom Hooks Guide](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [TypeScript with React](https://react.dev/learn/typescript)

---

**Happy Learning! 🚀**
