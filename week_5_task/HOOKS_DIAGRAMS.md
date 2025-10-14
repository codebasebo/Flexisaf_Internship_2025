# React Hooks Flow Diagrams

## Component Lifecycle with Hooks

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Render Cycle                     │
└─────────────────────────────────────────────────────────────┘

    Initial Render                    Re-render (state change)
         │                                     │
         ├──► 1. Call useState()              ├──► 1. Get current state
         │      - Initialize state             │      - Use previous state
         │                                     │
         ├──► 2. Call useRef()                ├──► 2. Get ref object
         │      - Create ref object            │      - Same ref instance
         │                                     │
         ├──► 3. Return JSX                   ├──► 3. Return JSX
         │      - Render UI                    │      - Render updated UI
         │                                     │
         ├──► 4. React updates DOM            ├──► 4. React updates DOM
         │      - Commit phase                 │      - Commit phase
         │                                     │
         └──► 5. Call useEffect()             └──► 5. Call useEffect()
                - Run side effects                   - Check dependencies
                - Setup subscriptions                - Run if deps changed
                                                     - Cleanup previous
```

## useState Flow

```
┌──────────────────────────────────────────────────────────────┐
│                       useState Flow                           │
└──────────────────────────────────────────────────────────────┘

const [count, setCount] = useState(0)
       │       │                    │
       │       │                    └── Initial value
       │       │
       │       └── Setter function (triggers re-render)
       │
       └── Current state value

User clicks button
       │
       ├──► setCount(1)
       │        │
       │        ├──► React schedules update
       │        │
       │        ├──► Component re-renders
       │        │
       │        └──► count = 1 (new value)
       │
       └──► UI updates with new value
```

## useEffect Dependency Array

```
┌──────────────────────────────────────────────────────────────┐
│                useEffect Execution Logic                      │
└──────────────────────────────────────────────────────────────┘

useEffect(() => {
  // Effect code
  return () => {
    // Cleanup
  }
}, [dep1, dep2])

┌─────────────────────┐
│  Component Mounts   │
└──────────┬──────────┘
           │
           ├──► Run effect
           │
           │
┌──────────▼──────────┐
│  Component Updates  │
└──────────┬──────────┘
           │
           ├──► Has [dep1, dep2] changed?
           │         │
           │    ┌────┴────┐
           │    │         │
           │   Yes       No
           │    │         │
           │    ├──► Run cleanup
           │    │    (previous effect)
           │    │
           │    ├──► Run effect
           │    │    (new effect)
           │    │
           │    └──► Done
           │         │
           │    ┌────┘
           │    │
┌──────────▼────┴─────┐
│ Component Unmounts  │
└──────────┬──────────┘
           │
           └──► Run cleanup
                (final cleanup)
```

## useRef vs useState

```
┌──────────────────────────────────────────────────────────────┐
│               useRef vs useState Comparison                   │
└──────────────────────────────────────────────────────────────┘

        useState                          useRef
          │                                 │
          ├──► Creates state               ├──► Creates mutable object
          │                                 │
          ├──► Triggers re-render          ├──► No re-render
          │    on update                    │    on update
          │                                 │
          ├──► Value in component          ├──► .current property
          │                                 │
          ├──► Use for: UI state           ├──► Use for: DOM refs,
          │    (affects rendering)          │    mutable values,
          │                                 │    previous values
          │                                 │
          └──► Example:                    └──► Example:
               const [count, setCount]          const countRef = useRef(0)
               = useState(0)                     countRef.current += 1
                                                (no re-render!)
```

## Custom Hook Composition

```
┌──────────────────────────────────────────────────────────────┐
│                 Custom Hook Architecture                      │
└──────────────────────────────────────────────────────────────┘

Component
    │
    ├──► useMousePosition()
    │         │
    │         ├──► useState({ x: 0, y: 0 })
    │         │        │
    │         │        └──► Returns [position, setPosition]
    │         │
    │         ├──► useEffect(() => {
    │         │       addEventListener('mousemove', handler)
    │         │       return () => removeEventListener(...)
    │         │     }, [])
    │         │
    │         └──► Returns position
    │                  │
    ├─────────────────┘
    │
    └──► Component uses position.x and position.y
```

## Event Listener Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│             Event Listener with Cleanup                       │
└──────────────────────────────────────────────────────────────┘

useEffect(() => {
  const handler = (e) => setPosition({ x: e.clientX, y: e.clientY })
  
  window.addEventListener('mousemove', handler)
  
  return () => {
    window.removeEventListener('mousemove', handler)
  }
}, [])

Timeline:
────────────────────────────────────────────────────────────────

Mount       User moves mouse     User moves mouse     Unmount
  │               │                    │                 │
  ├──► Setup      ├──► Handler         ├──► Handler      ├──► Cleanup
  │    listener   │    called          │    called       │    remove
  │               │    → Update         │    → Update     │    listener
  │               │      state          │      state      │
  │               │    → Re-render      │    → Re-render  │
```

## Data Fetching Pattern

```
┌──────────────────────────────────────────────────────────────┐
│              useFetch Hook Flow Diagram                       │
└──────────────────────────────────────────────────────────────┘

const { data, loading, error } = useFetch(url)

Component renders
       │
       ├──► useFetch called
       │         │
       │         ├──► Set loading = true
       │         │
       │         ├──► useEffect triggered
       │         │         │
       │         │         ├──► Start fetch(url)
       │         │         │         │
       │         │         │    ┌────┴─────┐
       │         │         │    │          │
       │         │         │  Success    Error
       │         │         │    │          │
       │         │         │    ├──► Set data
       │         │         │    │    Set loading = false
       │         │         │    │
       │         │         │    ├──► Set error
       │         │         │    │    Set loading = false
       │         │         │    │
       │         │         └────┴──────────┘
       │         │                   │
       │         ├──► Return         │
       │         │    { data, loading, error }
       │         │                   │
       │         │                   │
       └─────────┴───────────────────┘
                 │
                 └──► Component re-renders
                      with new data/error
```

## LocalStorage Sync Pattern

```
┌──────────────────────────────────────────────────────────────┐
│           useLocalStorage Sync Flow                          │
└──────────────────────────────────────────────────────────────┘

const [value, setValue] = useLocalStorage('key', initialValue)

Initial Render
      │
      ├──► Check localStorage.getItem('key')
      │          │
      │     ┌────┴─────┐
      │     │          │
      │   Found     Not Found
      │     │          │
      │     ├──► Use stored value
      │     │
      │     ├──► Use initialValue
      │     │
      └─────┴──────────┘
            │
            └──► Initialize state

User calls setValue(newValue)
      │
      ├──► Update state (triggers re-render)
      │
      └──► localStorage.setItem('key', newValue)
            │
            └──► Persisted to browser storage

Page Reload
      │
      └──► Value restored from localStorage ✓
```

## Debounce Pattern

```
┌──────────────────────────────────────────────────────────────┐
│              useDebounce Timing Diagram                       │
└──────────────────────────────────────────────────────────────┘

User types: "r" → "re" → "rea" → "reac" → "react"
Timeline (500ms delay):

0ms    "r"     ├──► Start timer (500ms)
100ms  "re"    ├──► Cancel timer
               ├──► Start new timer (500ms)
200ms  "rea"   ├──► Cancel timer
               ├──► Start new timer (500ms)
300ms  "reac"  ├──► Cancel timer
               ├──► Start new timer (500ms)
400ms  "react" ├──► Cancel timer
               ├──► Start new timer (500ms)
               │
               │ User stops typing
               │
900ms          └──► Timer completes
                    ├──► Update debouncedValue = "react"
                    └──► Trigger search/API call
                         (Only once, not 5 times!)
```

## Hook Composition Example

```
┌──────────────────────────────────────────────────────────────┐
│           Building Complex Features with Hooks               │
└──────────────────────────────────────────────────────────────┘

SearchComponent
      │
      ├──► const [query, setQuery] = useState('')
      │         │
      │         └──► User input tracking
      │
      ├──► const debouncedQuery = useDebounce(query, 500)
      │         │
      │         └──► Delay updates for performance
      │
      ├──► const { data, loading } = useFetch(`/api/search?q=${debouncedQuery}`)
      │         │
      │         └──► Fetch search results
      │
      ├──► const isOnline = useOnlineStatus()
      │         │
      │         └──► Check network status
      │
      └──► Combine all data to render UI
            ├──► Show loading spinner if loading
            ├──► Show offline message if !isOnline
            └──► Display results from data
```

## Memory Leak Prevention

```
┌──────────────────────────────────────────────────────────────┐
│         Preventing Race Conditions & Memory Leaks             │
└──────────────────────────────────────────────────────────────┘

useEffect(() => {
  let isMounted = true  // ← Flag to track mount status
  
  async function fetchData() {
    const result = await fetch(url)
    const data = await result.json()
    
    if (isMounted) {  // ← Only update if still mounted
      setState(data)
    }
  }
  
  fetchData()
  
  return () => {
    isMounted = false  // ← Mark as unmounted
  }
}, [url])

Scenario: Fast navigation
────────────────────────────────────────────────────────────────

1. User visits Page A
   ├──► Component mounts
   ├──► isMounted = true
   └──► Start fetch

2. User navigates to Page B (before fetch completes)
   ├──► Component unmounts
   ├──► Cleanup runs
   └──► isMounted = false

3. Fetch completes
   ├──► Check isMounted
   ├──► isMounted is false
   └──► Skip setState (prevents memory leak!) ✓
```

---

## Quick Reference

### useState
- **Triggers**: Re-renders
- **Use for**: UI state
- **Updates**: Asynchronous

### useEffect
- **Runs**: After render
- **Use for**: Side effects
- **Cleanup**: Before unmount/re-run

### useRef
- **Triggers**: No re-renders
- **Use for**: DOM refs, mutable values
- **Updates**: Synchronous

### Custom Hooks
- **Composition**: Combine built-in hooks
- **Reusability**: Share logic across components
- **Naming**: Must start with "use"

---

**Print this and keep it near your desk! 📌**
