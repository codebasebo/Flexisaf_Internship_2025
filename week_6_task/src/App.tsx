import { useState } from 'react';
import './App.css';
import JsonDataDemo from './components/JsonDataDemo';
import FormDataDemo from './components/FormDataDemo';
import PromiseDemo from './components/PromiseDemo';
import AsyncAwaitDemo from './components/AsyncAwaitDemo';
import FishDemo from './components/FishDemo';

function App() {
  const [activeTab, setActiveTab] = useState<'json' | 'form' | 'promises' | 'async' | 'fish'>('json');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 Asynchronous React</h1>
        <p className="subtitle">Week 6 Task - Exploring Async Patterns in React</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={activeTab === 'json' ? 'active' : ''}
          onClick={() => setActiveTab('json')}
        >
          📄 JSON Data
        </button>
        <button
          className={activeTab === 'form' ? 'active' : ''}
          onClick={() => setActiveTab('form')}
        >
          📝 Form Data
        </button>
        <button
          className={activeTab === 'promises' ? 'active' : ''}
          onClick={() => setActiveTab('promises')}
        >
          🎯 Promises
        </button>
        <button
          className={activeTab === 'async' ? 'active' : ''}
          onClick={() => setActiveTab('async')}
        >
          ⚡ Async/Await
        </button>
        <button
          className={activeTab === 'fish' ? 'active' : ''}
          onClick={() => setActiveTab('fish')}
        >
          🐟 Fish
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'json' && <JsonDataDemo />}
        {activeTab === 'form' && <FormDataDemo />}
        {activeTab === 'promises' && <PromiseDemo />}
        {activeTab === 'async' && <AsyncAwaitDemo />}
        {activeTab === 'fish' && <FishDemo />}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript + Vite</p>
        <p>Demonstrating: JSON, Form Data, Promises, and Async/Await</p>
      </footer>
    </div>
  );
}

export default App;
