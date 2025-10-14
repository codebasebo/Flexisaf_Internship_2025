# React Hooks Quick Reference

## 📌 Hook Rules

1. ✅ Only call hooks at the **top level** of your function
2. ✅ Only call hooks from **React functions** (components or custom hooks)
3. ✅ Custom hooks must start with **"use"**

---

## useState

### Basic Usage
```tsx
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [items, setItems] = useState([])
```

### With TypeScript
```tsx
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<string[]>([])
```

### Functional Updates
```tsx
// ❌ Bad - can use stale value
setCount(count + 1)

// ✅ Good - always uses latest value
setCount(prev => prev + 1)
```

### Lazy Initialization
```tsx
const [state, setState] = useState(() => {
  const initialState = expensiveComputation()
  return initialState
})
```

---

## useEffect

### Run After Every Render
```tsx
useEffect(() => {
  // Runs after every render
  document.title = `Count: ${count}`
})
```

### Run Once (on Mount)
```tsx
useEffect(() => {
  // Runs once when component mounts
  fetchData()
}, []) // Empty dependency array
```

### Run When Dependencies Change
```tsx
useEffect(() => {
  // Runs when userId changes
  fetchUser(userId)
}, [userId])
```

### With Cleanup
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick')
  }, 1000)

  // Cleanup function
  return () => {
    clearInterval(timer)
  }
}, [])
```

### Async Operations
```tsx
useEffect(() => {
  let isMounted = true

  async function fetchData() {
    const result = await fetch(url)
    const data = await result.json()
    
    if (isMounted) {
      setData(data)
    }
  }

  fetchData()

  return () => {
    isMounted = false
  }
}, [url])
```

---

## useRef

### DOM References
```tsx
const inputRef = useRef<HTMLInputElement>(null)

const focusInput = () => {
  inputRef.current?.focus()
}

return <input ref={inputRef} />
```

### Mutable Values (Don't Trigger Re-renders)
```tsx
const renderCount = useRef(0)

useEffect(() => {
  renderCount.current += 1
})
```

### Previous Value
```tsx
const usePrevious = (value) => {
  const ref = useRef()
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}
```

---

## Custom Hooks

### Basic Structure
```tsx
function useCustomHook(param) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    }
  }, [param])

  return state
}
```

### useLocalStorage
```tsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

### useDebounce
```tsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

### useFetch
```tsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}
```

---

## Common Patterns

### Toggle Boolean
```tsx
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(prev => !prev)
```

### Form Input
```tsx
const [value, setValue] = useState('')
<input 
  value={value} 
  onChange={e => setValue(e.target.value)} 
/>
```

### Array Operations
```tsx
// Add item
setItems(prev => [...prev, newItem])

// Remove item
setItems(prev => prev.filter(item => item.id !== id))

// Update item
setItems(prev => prev.map(item => 
  item.id === id ? { ...item, ...updates } : item
))
```

### Object Updates
```tsx
setUser(prev => ({ ...prev, name: 'New Name' }))
```

---

## Common Pitfalls

### ❌ Infinite Loop
```tsx
useEffect(() => {
  setCount(count + 1) // Creates infinite loop!
})
```

### ✅ Fix
```tsx
useEffect(() => {
  setCount(count + 1)
}, []) // Add dependency array
```

---

### ❌ Stale Closure
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1) // Uses stale count
  }, 1000)
  return () => clearInterval(timer)
}, [])
```

### ✅ Fix
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1) // Always uses latest
  }, 1000)
  return () => clearInterval(timer)
}, [])
```

---

### ❌ Missing Cleanup
```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize)
}, [])
```

### ✅ Fix
```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

---

### ❌ Async in useEffect
```tsx
useEffect(async () => {
  const data = await fetchData() // Wrong!
}, [])
```

### ✅ Fix
```tsx
useEffect(() => {
  async function fetch() {
    const data = await fetchData()
    setData(data)
  }
  fetch()
}, [])
```

---

## Dependency Array Guide

| Pattern | Behavior |
|---------|----------|
| No array | Runs after **every** render |
| `[]` | Runs **once** on mount |
| `[dep]` | Runs when `dep` **changes** |
| `[a, b]` | Runs when `a` **or** `b` changes |

---

## TypeScript Tips

### State Types
```tsx
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<Item[]>([])
const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
```

### Ref Types
```tsx
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)
const buttonRef = useRef<HTMLButtonElement>(null)
```

### Custom Hook Types
```tsx
function useCustomHook<T>(initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initial)
  return [value, setValue]
}
```

---

## Performance Tips

1. **Use functional updates** for state that depends on previous state
2. **Memoize expensive computations** with useMemo
3. **Memoize callback functions** with useCallback
4. **Debounce rapid updates** with custom useDebounce hook
5. **Split state** into multiple useState calls for better optimization

---

## When to Use Each Hook

| Hook | Use Case |
|------|----------|
| `useState` | Component state that triggers re-renders |
| `useEffect` | Side effects, subscriptions, API calls |
| `useRef` | DOM access, mutable values without re-renders |
| `useMemo` | Expensive computations |
| `useCallback` | Memoize functions passed as props |
| `useContext` | Access context values |
| `useReducer` | Complex state logic |

---

## Resources

- 📚 [React Docs](https://react.dev/reference/react)
- 🎓 [Hooks API Reference](https://react.dev/reference/react/hooks)
- 🔧 [TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Keep this handy while coding! 🚀**
