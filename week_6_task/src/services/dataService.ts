// Data service with Promise examples

import type { PromiseResult } from '../types';

export const dataService = {
  // Simple Promise example
  fetchDataWithPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
          resolve('Data fetched successfully with Promise!');
        } else {
          reject(new Error('Failed to fetch data'));
        }
      }, 2000);
    });
  },

  // Promise with multiple steps
  processDataInSteps(): Promise<string[]> {
    const step1 = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('Step 1: Data validated'), 500);
    });

    const step2 = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('Step 2: Data processed'), 500);
    });

    const step3 = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('Step 3: Data saved'), 500);
    });

    return step1()
      .then(result1 => {
        return step2().then(result2 => [result1, result2]);
      })
      .then(results => {
        return step3().then(result3 => [...results, result3]);
      });
  },

  // Promise.all example - parallel execution
  fetchMultipleResources(): Promise<PromiseResult[]> {
    const fetchResource1 = new Promise<PromiseResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Resource 1 loaded',
          timestamp: Date.now()
        });
      }, 1000);
    });

    const fetchResource2 = new Promise<PromiseResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Resource 2 loaded',
          timestamp: Date.now()
        });
      }, 1500);
    });

    const fetchResource3 = new Promise<PromiseResult>((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Resource 3 loaded',
          timestamp: Date.now()
        });
      }, 800);
    });

    return Promise.all([fetchResource1, fetchResource2, fetchResource3]);
  },

  // Promise.race example - first to complete wins
  fetchWithTimeout(timeoutMs: number = 3000): Promise<string> {
    const fetchPromise = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Data fetched successfully!');
      }, 2000);
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    });

    return Promise.race([fetchPromise, timeoutPromise]);
  },

  // Async/Await example with error handling
  async fetchUserProfile(userId: number): Promise<{ id: number; name: string; email: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (userId <= 0) {
        throw new Error('Invalid user ID');
      }

      return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Sequential async operations
  async processSequentially(): Promise<string[]> {
    const results: string[] = [];
    
    // Each step waits for the previous one
    const result1 = await new Promise<string>(resolve => {
      setTimeout(() => resolve('Sequential Step 1 completed'), 500);
    });
    results.push(result1);

    const result2 = await new Promise<string>(resolve => {
      setTimeout(() => resolve('Sequential Step 2 completed'), 500);
    });
    results.push(result2);

    const result3 = await new Promise<string>(resolve => {
      setTimeout(() => resolve('Sequential Step 3 completed'), 500);
    });
    results.push(result3);

    return results;
  }
};
