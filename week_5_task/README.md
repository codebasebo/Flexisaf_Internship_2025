# React Hooks Advanced Demo

A comprehensive React application demonstrating advanced usage of **useState**, **useEffect**, **useRef**, and **custom hooks**.

## 🎯 Learning Objectives

- Master useState for complex state patterns (functional updates, objects, arrays)
- Understand useEffect lifecycle, dependencies, cleanup, and race conditions
- Use useRef for DOM manipulation and mutable values without re-renders
- Build reusable custom hooks for common patterns

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── styles.css                 # Global styles
├── pages/
│   ├── Home.tsx              # Landing page with overview
│   ├── UseStateDemo.tsx      # useState demonstrations
│   ├── UseEffectDemo.tsx     # useEffect demonstrations
│   ├── UseRefDemo.tsx        # useRef demonstrations
│   ├── CustomHooksDemo.tsx   # Custom hooks demonstrations
│   └── Presentation.tsx      # Assessment presentation
└── hooks/
    ├── useDebounce.ts        # Debounce hook
    ├── useDebounce.test.tsx  # Unit tests
    ├── useLocalStorage.ts    # Persistent state hook
    └── useInterval.ts        # Stable interval hook
```

## 🎓 What's Demonstrated

### 1. useState (`/state`)
- **Counter with functional updates**: Safe state updates based on previous value
- **Object state management**: Form with first/last name fields
- **Array state operations**: Todo list with add, toggle, and delete

**Key Concepts:**
- Functional updates: `setState(prev => prev + 1)`
- Object spreading: `setState({ ...state, key: value })`
- Array immutability: map, filter, spread for updates

### 2. useEffect (`/effect`)
- **GitHub repository search** with debouncing
- **Cleanup with AbortController** to prevent race conditions
- **Dependency arrays** for controlled re-runs
- **useMemo** for derived state (total stars calculation)

**Key Concepts:**
- Effect dependencies: `[debounced]`
- Cleanup functions: abort fetch on unmount/re-run
- Debouncing input to reduce API calls
- Avoiding memory leaks with cancellation flags

### 3. useRef (`/ref`)
- **DOM manipulation**: Focus input via ref
- **Mutable instance variables**: Render counter without re-renders
- **Previous value tracking**: Custom hook using refs

**Key Concepts:**
- DOM refs: `inputRef.current?.focus()`
- Mutable refs: persist values across renders
- Avoiding re-renders: ref changes don't trigger renders

### 4. Custom Hooks (`/custom`)

#### useDebounce
```typescript
const debouncedValue = useDebounce(searchTerm, 500);
```
- Delays value updates to reduce expensive operations
- Used in search to avoid API call spam

#### useLocalStorage
```typescript
const [name, setName, removeName] = useLocalStorage('key', 'default');
```
- Persists state to localStorage
- Rehydrates on page load
- Type-safe with generics

#### useInterval
```typescript
useInterval(() => setTick(t => t + 1), running ? 1000 : null);
```
- Stable interval that doesn't recreate on every render
- Supports pause/resume by passing null delay
- Prevents common interval pitfalls in React

### 5. Presentation (`/presentation`)
- Learning objectives summary
- Key takeaways for each hook
- Code snippets for discussion
- Demo roadmap

## 🧪 Testing

Unit tests included for custom hooks using Vitest + Testing Library:
- `useDebounce.test.tsx`: Fake timers, async updates

Run tests:
```bash
npm test
```

## 🎨 Features

- **TypeScript** for type safety
- **React Router** for navigation
- **Dark theme UI** with modern styling
- **Responsive layout** with CSS Grid
- **Production ready** with Vite build optimization

## 📚 Technologies

- React 18
- TypeScript 5
- Vite 5
- React Router 6
- Vitest + Testing Library
- GitHub API integration

## 🌐 Deployment

The app is configured for Vercel deployment with SPA routing support via `vercel.json`.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 💡 Key Learnings

### useState
- Always use functional updates when new state depends on old state
- Spread objects/arrays for immutable updates
- Consider useReducer for complex state logic

### useEffect
- Declare all dependencies explicitly
- Always clean up side effects (timers, subscriptions, requests)
- Use AbortController for fetch cancellation
- Debounce expensive operations

### useRef
- Use for DOM access and mutable instance variables
- Ref changes don't trigger re-renders (unlike state)
- Perfect for tracking previous values or render counts

### Custom Hooks
- Extract reusable logic into custom hooks
- Follow the "use" naming convention
- Compose hooks for powerful abstractions
- Handle edge cases (storage quota, browser APIs)

## 🎯 Assessment Criteria Met

✅ useState implementation with complex patterns  
✅ useEffect with cleanup and dependencies  
✅ useRef for DOM and mutable refs  
✅ Custom hooks (debounce, localStorage, interval)  
✅ Full React application with routing  
✅ TypeScript for type safety  
✅ Unit tests for hooks  
✅ Production build configuration  
✅ Presentation for learning outcomes  

## 📝 Notes

- GitHub API is rate-limited (60 requests/hour without auth)
- localStorage quota varies by browser
- All custom hooks are reusable across projects

---

**Author**: Flexisaf Internship 2025  
**Purpose**: Advanced React Hooks Learning & Assessment
