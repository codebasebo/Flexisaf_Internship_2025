import fishData from '../data/fish.json';

export const fishService = {
  // Simulate fetching fish JSON (returns Promise)
  async fetchFish() {
    // simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));
    return (fishData as any[]);
  },

  // Fetch fish by ID
  async fetchFishById(id: number) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const fish = (fishData as any[]).find(f => f.id === id);
    if (!fish) throw new Error('Fish not found');
    return fish;
  },

  // Simulate uploading fish data via FormData
  async uploadFishData(formData: FormData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo we just return a parsed object
    const result: any = {};
    formData.forEach((value, key) => {
      result[key] = value instanceof File ? { name: value.name, size: value.size } : value;
    });
    return { success: true, data: result, timestamp: Date.now() };
  },

  // Promise example: randomly succeed or fail
  fishPromiseExample(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ok = Math.random() > 0.3;
        if (ok) resolve('Fish promise resolved successfully');
        else reject(new Error('Fish promise failed'));
      }, 800);
    });
  }
};
