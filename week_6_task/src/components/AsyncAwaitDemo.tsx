import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { asyncHelpers } from '../utils/asyncHelpers';

// Component demonstrating Async/Await
const AsyncAwaitDemo: React.FC = () => {
  const [sequentialResults, setSequentialResults] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [retryResult, setRetryResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sequential async operations
  const runSequential = async () => {
    setLoading('sequential');
    setError(null);
    setSequentialResults([]);

    try {
      const results = await dataService.processSequentially();
      setSequentialResults(results);
    } catch (err) {
      setError(`Sequential Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  // Async/await with error handling
  const fetchUserProfile = async () => {
    setLoading('profile');
    setError(null);
    setUserProfile(null);

    try {
      const userId = Math.floor(Math.random() * 10) + 1;
      const profile = await dataService.fetchUserProfile(userId);
      setUserProfile(profile);
    } catch (err) {
      setError(`Profile Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  // Retry mechanism with async/await
  const testRetryMechanism = async () => {
    setLoading('retry');
    setError(null);
    setRetryResult(null);

    try {
      // Simulate an unreliable operation
      const unreliableOp = async () => {
        const random = Math.random();
        await asyncHelpers.delay(500);
        if (random < 0.7) {
          throw new Error('Random failure (will retry)');
        }
        return 'Operation succeeded after retry!';
      };

      const result = await asyncHelpers.retry(unreliableOp, 5, 800);
      setRetryResult(result);
    } catch (err) {
      setError(`Retry Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  // Parallel async with Promise.all
  const runParallelAsync = async () => {
    setLoading('parallel');
    setError(null);

    try {
      // Multiple async operations in parallel
      const [result1, result2, result3] = await Promise.all([
        asyncHelpers.delay(1000).then(() => 'Task 1 completed'),
        asyncHelpers.delay(800).then(() => 'Task 2 completed'),
        asyncHelpers.delay(1200).then(() => 'Task 3 completed')
      ]);

      alert(`Parallel Results:\n${result1}\n${result2}\n${result3}`);
    } catch (err) {
      setError(`Parallel Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  // Try-catch-finally example
  const demonstrateTryCatchFinally = async () => {
    setLoading('trycatch');
    setError(null);

    let cleanupCalled = false;

    try {
      alert('Try block: Starting async operation...');
      await asyncHelpers.delay(1000);
      
      // Randomly fail or succeed
      if (Math.random() < 0.5) {
        throw new Error('Intentional error to demonstrate catch block');
      }
      
      alert('Try block: Operation succeeded!');
    } catch (err) {
      alert(`Catch block: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      cleanupCalled = true;
      alert('Finally block: Always executes for cleanup');
      setLoading(null);
    }

    if (cleanupCalled) {
      alert('Cleanup was performed in finally block!');
    }
  };

  return (
    <div className="demo-section">
      <h2>⚡ Async/Await</h2>
      <p>Demonstrates modern async/await syntax for handling asynchronous operations</p>

      <div className="async-demos">
        {/* Sequential Operations */}
        <div className="async-card">
          <h3>Sequential Async</h3>
          <p>Operations run one after another</p>
          <button onClick={runSequential} disabled={loading === 'sequential'}>
            {loading === 'sequential' ? 'Running...' : 'Run Sequential'}
          </button>
          {sequentialResults.length > 0 && (
            <div className="result success">
              {sequentialResults.map((result, idx) => (
                <div key={idx}>✓ {result}</div>
              ))}
              <small>Total time: ~1.5 seconds</small>
            </div>
          )}
        </div>

        {/* User Profile Fetch */}
        <div className="async-card">
          <h3>Fetch User Profile</h3>
          <p>Async/await with error handling</p>
          <button onClick={fetchUserProfile} disabled={loading === 'profile'}>
            {loading === 'profile' ? 'Fetching...' : 'Fetch Profile'}
          </button>
          {userProfile && (
            <div className="result success">
              <strong>ID:</strong> {userProfile.id}<br />
              <strong>Name:</strong> {userProfile.name}<br />
              <strong>Email:</strong> {userProfile.email}
            </div>
          )}
        </div>

        {/* Retry Mechanism */}
        <div className="async-card">
          <h3>Retry Mechanism</h3>
          <p>Auto-retry failed operations</p>
          <button onClick={testRetryMechanism} disabled={loading === 'retry'}>
            {loading === 'retry' ? 'Retrying...' : 'Test Retry'}
          </button>
          {retryResult && (
            <div className="result success">{retryResult}</div>
          )}
        </div>

        {/* Parallel Async */}
        <div className="async-card">
          <h3>Parallel Async</h3>
          <p>Multiple operations simultaneously</p>
          <button onClick={runParallelAsync} disabled={loading === 'parallel'}>
            {loading === 'parallel' ? 'Running...' : 'Run Parallel'}
          </button>
        </div>

        {/* Try-Catch-Finally */}
        <div className="async-card">
          <h3>Try-Catch-Finally</h3>
          <p>Complete error handling</p>
          <button onClick={demonstrateTryCatchFinally} disabled={loading === 'trycatch'}>
            {loading === 'trycatch' ? 'Running...' : 'Demo Try-Catch-Finally'}
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="info-box">
        <h4>Async/Await Benefits:</h4>
        <ul>
          <li>✓ Cleaner syntax than Promises</li>
          <li>✓ Better error handling with try-catch</li>
          <li>✓ Easier to read and debug</li>
          <li>✓ Works with Promise-based APIs</li>
          <li>✓ Can mix with Promise.all for parallelism</li>
        </ul>
      </div>
    </div>
  );
};

export default AsyncAwaitDemo;
