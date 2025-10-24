import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import type { PromiseResult } from '../types';

// Component demonstrating Promises
const PromiseDemo: React.FC = () => {
  const [simpleResult, setSimpleResult] = useState<string | null>(null);
  const [stepResults, setStepResults] = useState<string[]>([]);
  const [parallelResults, setParallelResults] = useState<PromiseResult[]>([]);
  const [raceResult, setRaceResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simple Promise example
  const runSimplePromise = () => {
    setLoading('simple');
    setError(null);
    setSimpleResult(null);

    dataService.fetchDataWithPromise()
      .then(result => {
        setSimpleResult(result);
      })
      .catch(err => {
        setError(`Simple Promise Error: ${err.message}`);
      })
      .finally(() => {
        setLoading(null);
      });
  };

  // Promise chaining example
  const runPromiseChain = () => {
    setLoading('chain');
    setError(null);
    setStepResults([]);

    dataService.processDataInSteps()
      .then(results => {
        setStepResults(results);
      })
      .catch(err => {
        setError(`Promise Chain Error: ${err.message}`);
      })
      .finally(() => {
        setLoading(null);
      });
  };

  // Promise.all example (parallel execution)
  const runParallelPromises = () => {
    setLoading('parallel');
    setError(null);
    setParallelResults([]);

    dataService.fetchMultipleResources()
      .then(results => {
        setParallelResults(results);
      })
      .catch(err => {
        setError(`Promise.all Error: ${err.message}`);
      })
      .finally(() => {
        setLoading(null);
      });
  };

  // Promise.race example
  const runPromiseRace = () => {
    setLoading('race');
    setError(null);
    setRaceResult(null);

    dataService.fetchWithTimeout(3000)
      .then(result => {
        setRaceResult(result);
      })
      .catch(err => {
        setError(`Promise.race Error: ${err.message}`);
      })
      .finally(() => {
        setLoading(null);
      });
  };

  return (
    <div className="demo-section">
      <h2>🎯 Promises</h2>
      <p>Demonstrates different Promise patterns and methods</p>

      <div className="promise-demos">
        {/* Simple Promise */}
        <div className="promise-card">
          <h3>Simple Promise</h3>
          <p>Basic Promise with resolve/reject</p>
          <button onClick={runSimplePromise} disabled={loading === 'simple'}>
            {loading === 'simple' ? 'Running...' : 'Run Simple Promise'}
          </button>
          {simpleResult && (
            <div className="result success">{simpleResult}</div>
          )}
        </div>

        {/* Promise Chaining */}
        <div className="promise-card">
          <h3>Promise Chaining</h3>
          <p>Sequential .then() calls</p>
          <button onClick={runPromiseChain} disabled={loading === 'chain'}>
            {loading === 'chain' ? 'Running...' : 'Run Promise Chain'}
          </button>
          {stepResults.length > 0 && (
            <div className="result success">
              {stepResults.map((step, idx) => (
                <div key={idx}>{step}</div>
              ))}
            </div>
          )}
        </div>

        {/* Promise.all */}
        <div className="promise-card">
          <h3>Promise.all</h3>
          <p>Run multiple Promises in parallel</p>
          <button onClick={runParallelPromises} disabled={loading === 'parallel'}>
            {loading === 'parallel' ? 'Running...' : 'Run Promise.all'}
          </button>
          {parallelResults.length > 0 && (
            <div className="result success">
              {parallelResults.map((result, idx) => (
                <div key={idx}>
                  {result.message} (at {new Date(result.timestamp).toLocaleTimeString()})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promise.race */}
        <div className="promise-card">
          <h3>Promise.race</h3>
          <p>First Promise to complete wins</p>
          <button onClick={runPromiseRace} disabled={loading === 'race'}>
            {loading === 'race' ? 'Running...' : 'Run Promise.race'}
          </button>
          {raceResult && (
            <div className="result success">{raceResult}</div>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="info-box">
        <h4>Promise Concepts:</h4>
        <ul>
          <li><strong>.then()</strong> - Handle successful resolution</li>
          <li><strong>.catch()</strong> - Handle errors</li>
          <li><strong>.finally()</strong> - Always executes</li>
          <li><strong>Promise.all()</strong> - Wait for all Promises</li>
          <li><strong>Promise.race()</strong> - First to finish wins</li>
        </ul>
      </div>
    </div>
  );
};

export default PromiseDemo;
