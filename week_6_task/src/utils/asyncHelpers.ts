// Utility functions for async operations

export const asyncHelpers = {
  // Delay utility
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Retry logic for failed promises
  async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
          await this.delay(delayMs);
        }
      }
    }
    
    throw new Error(`Failed after ${maxAttempts} attempts: ${lastError?.message}`);
  },

  // Batch processing with async
  async processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = 5
  ): Promise<R[]> {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);
    }
    
    return results;
  },

  // Convert callback to promise
  promisify<T>(
    callback: (cb: (error: Error | null, result?: T) => void) => void
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      callback((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as T);
        }
      });
    });
  }
};
