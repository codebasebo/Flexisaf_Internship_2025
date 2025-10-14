import CounterDemo from './components/CounterDemo'
import TimerDemo from './components/TimerDemo'
import InputFocusDemo from './components/InputFocusDemo'
import MouseTrackerDemo from './components/MouseTrackerDemo'
import OnlineStatusDemo from './components/OnlineStatusDemo'
import WindowSizeDemo from './components/WindowSizeDemo'
import LocalStorageDemo from './components/LocalStorageDemo'
import FetchDataDemo from './components/FetchDataDemo'
import SearchDemo from './components/SearchDemo'

function App() {
  return (
    <div className="app">
      <header>
        <h1>🎣 React Hooks Showcase</h1>
        <p className="subtitle">
          Demonstrating useState, useEffect, useRef & Custom Hooks
        </p>
      </header>

      <div className="demos-container">
        <CounterDemo />
        <TimerDemo />
        <InputFocusDemo />
        <MouseTrackerDemo />
        <OnlineStatusDemo />
        <WindowSizeDemo />
        <LocalStorageDemo />
        <FetchDataDemo />
        <SearchDemo />
      </div>
    </div>
  )
}

export default App
