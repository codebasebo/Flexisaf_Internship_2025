import React, { useState, useEffect } from 'react';
import './App.css';

// ✅ PROPS EXAMPLE - Props interface
interface UserProps {
  name: string;
  age: number;
  email: string;
}

// ✅ FUNCTIONAL COMPONENT with Props, State, and Event Handlers
const UserCard: React.FC<UserProps> = ({ name, age, email }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(0);

  // ✅ EVENT HANDLERS
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      {/* ✅ CONDITIONAL RENDERING with JSX */}
      {isExpanded && (
        <>
          <p>Email: {email}</p>
          <p>Likes: {likes}</p>
          <button onClick={handleLike} className="like-btn">
            👍 Like ({likes})
          </button>
        </>
      )}
      <button onClick={handleToggle} className="toggle-btn">
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

// ✅ CLASS COMPONENT with Lifecycle Methods
class Timer extends React.Component<{}, { seconds: number; isActive: boolean }> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      seconds: 0,
      isActive: false
    };
  }

  // ✅ LIFECYCLE METHOD - componentDidMount
  componentDidMount() {
    console.log('Timer component mounted');
  }

  // ✅ LIFECYCLE METHOD - componentDidUpdate
  componentDidUpdate(prevProps: {}, prevState: { seconds: number; isActive: boolean }) {
    if (prevState.isActive !== this.state.isActive) {
      if (this.state.isActive) {
        this.interval = setInterval(() => {
          this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
        }, 1000);
      } else {
        if (this.interval) {
          clearInterval(this.interval);
        }
      }
    }
  }

  // ✅ LIFECYCLE METHOD - componentWillUnmount
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    console.log('Timer component unmounted');
  }

  // ✅ EVENT HANDLERS in Class Component
  handleStartStop = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  handleReset = () => {
    this.setState({ seconds: 0, isActive: false });
  };

  render() {
    const { seconds, isActive } = this.state;
    return (
      <div className="timer">
        <h3>⏰ Class Component Timer</h3>
        <div className="timer-display">
          {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
        </div>
        <div className="timer-controls">
          <button onClick={this.handleStartStop} className={isActive ? 'stop-btn' : 'start-btn'}>
            {isActive ? '⏸️ Pause' : '▶️ Start'}
          </button>
          <button onClick={this.handleReset} className="reset-btn">
            🔄 Reset
          </button>
        </div>
      </div>
    );
  }
}

// ✅ FRAGMENT EXAMPLE Component
const FragmentExample: React.FC = () => {
  return (
    // ✅ FRAGMENT - No extra DOM wrapper
    <React.Fragment>
      <h3>🧩 Fragment Example</h3>
      <p>This content is wrapped in a Fragment</p>
      <p>No extra div wrapper is created in the DOM!</p>
    </React.Fragment>
  );
};

// ✅ STATE MANAGEMENT with useEffect (Lifecycle equivalent)
const DataFetcher: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // ✅ LIFECYCLE equivalent - componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log('DataFetcher mounted - simulating API call');
    
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData('✅ Data successfully loaded from API!');
      } catch (err) {
        setError('❌ Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (componentWillUnmount equivalent)
    return () => {
      console.log('DataFetcher cleanup');
    };
  }, []); // Empty dependency array = run once on mount

  if (loading) return <div className="loading">🔄 Loading data...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="data-fetcher">
      <h3>📡 Data Fetcher (useEffect)</h3>
      <p>{data}</p>
    </div>
  );
};

// ✅ MAIN APP COMPONENT
const App: React.FC = () => {
  const [showTimer, setShowTimer] = useState(true);
  const [users] = useState<UserProps[]>([
    { name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
    { name: 'Bob Smith', age: 34, email: 'bob@example.com' },
    { name: 'Carol Davis', age: 25, email: 'carol@example.com' }
  ]);

  // ✅ EVENT HANDLER
  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React Learning Outcomes Demo</h1>
        <p>Complete examples of all React concepts</p>
      </header>

      <main className="main-content">
        {/* ✅ VIRTUAL DOM EXPLANATION */}
        <section className="concept-section">
          <h2>🌐 Virtual DOM in Action</h2>
          <p>Every time you interact with this page, React:</p>
          <ul>
            <li>1. Creates a new Virtual DOM tree</li>
            <li>2. Compares it with the previous tree (diffing)</li>
            <li>3. Updates only the changed parts in the real DOM</li>
            <li>4. This makes React fast and efficient!</li>
          </ul>
        </section>

        {/* ✅ PROPS EXAMPLE */}
        <section className="concept-section">
          <h2>📋 Props Example</h2>
          <p>Data passed from parent to child components:</p>
          <div className="users-grid">
            {users.map((user, index) => (
              React.createElement(UserCard, {
                key: index,
                name: user.name,
                age: user.age,
                email: user.email
              })
            ))}
          </div>
        </section>

        {/* ✅ STATE & LIFECYCLE */}
        <section className="concept-section">
          <h2>🔄 State & Lifecycle</h2>
          <div className="lifecycle-demo">
            <button onClick={toggleTimer} className="toggle-timer-btn">
              {showTimer ? '🗑️ Unmount Timer' : '🏗️ Mount Timer'}
            </button>
            {showTimer && <Timer />}
          </div>
          <DataFetcher />
        </section>

        {/* ✅ FRAGMENT EXAMPLE */}
        <section className="concept-section">
          <h2>🧩 React Fragment</h2>
          <FragmentExample />
        </section>

        {/* ✅ JSX & EVENT HANDLERS */}
        <section className="concept-section">
          <h2>⚡ JSX & Event Handlers</h2>
          <div className="jsx-demo">
            <p>This entire UI is built with JSX!</p>
            <p>JSX allows us to write HTML-like syntax in JavaScript</p>
            <p>Event handlers like onClick, onChange, onSubmit make it interactive</p>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>🎓 React Learning Complete - All concepts demonstrated!</p>
      </footer>
    </div>
  );
};

export default App;
