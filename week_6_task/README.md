# Week 6 Task - Asynchronous React

A comprehensive React application demonstrating various asynchronous programming patterns including JSON handling, Form Data, Promises, and Async/Await.

## 🚀 Quick Start

### Prerequisites
- **Node.js v18+** (required for Vite 5) - [Download here](https://nodejs.org/)
  - Check version: `node --version`
  - If you have Node v12-16, upgrade to v18+ or v20 LTS

### Installation & Running
```bash
cd week_6_task
npm install
npm run dev
```

The app will open at `http://localhost:3000`

### Available Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎯 Features

### 1. **JSON Data Fetching**
- Fetch data from REST APIs using `fetch` API
- Parse and display JSON responses
- Create new resources with JSON payloads
- GET and POST requests with error handling

### 2. **Form Data Handling**
- Create and submit `FormData` objects
- Handle file uploads with multipart/form-data
- Process multiple input types (text, email, textarea, files)
- Display file information before upload

### 3. **Promises**
- **Simple Promises**: Basic resolve/reject patterns
- **Promise Chaining**: Sequential `.then()` operations
- **Promise.all**: Parallel execution of multiple promises
- **Promise.race**: First-to-complete pattern
- Error handling with `.catch()` and `.finally()`

### 4. **Async/Await**
- Modern async/await syntax
- Sequential and parallel async operations
- Try-catch-finally error handling
- Retry mechanisms for failed operations

### 5. **Fish Demo** 🐟
- Local JSON data loading
- Detail view with async fetch
- FormData upload simulation
- Promise examples with fish data

## 📁 Project Structure

```
week_6_task/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AsyncAwaitDemo.tsx    # Async/Await demonstrations
│   │   ├── FormDataDemo.tsx      # Form Data handling
│   │   ├── JsonDataDemo.tsx      # JSON operations
│   │   ├── PromiseDemo.tsx       # Promise patterns
│   │   └── FishDemo.tsx          # Fish demo with all patterns
│   ├── data/
│   │   └── fish.json             # Sample fish data
│   ├── services/
│   │   ├── api.ts                # API service layer
│   │   ├── dataService.ts        # Data operations
│   │   └── fishService.ts        # Fish data service
│   ├── types/
│   │   └── index.ts              # TypeScript definitions
│   ├── utils/
│   │   └── asyncHelpers.ts       # Async utilities
│   ├── App.css                   # Application styles
│   ├── App.tsx                   # Main App component
│   ├── index.css                 # Global styles
│   └── main.tsx                  # Entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **JSONPlaceholder API** - Mock REST API for testing

## 💻 Key Concepts & Examples

### JSON Operations
```typescript
// Fetch JSON
const response = await fetch('https://api.example.com/users');
const data = await response.json();

// Send JSON
await fetch('https://api.example.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Post', body: 'Content' })
});
```

### Form Data
```typescript
// Create and submit FormData
const formData = new FormData();
formData.append('name', 'John');
formData.append('file', fileInput.files[0]);

await fetch('/api/submit', {
  method: 'POST',
  body: formData
});
```

### Promises
```typescript
// Promise.all - parallel
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
]);

// Promise.race - timeout
const result = await Promise.race([
  fetchData(),
  timeout(5000)
]);
```

### Async/Await
```typescript
async function processData() {
  try {
    const step1 = await validateData();
    const step2 = await processData(step1);
    return step2;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    cleanup();
  }
}
```

## 🎨 UI Features

- **Dark Mode Design**: Modern dark theme with gradient accents
- **Responsive Layout**: Works on all screen sizes
- **Tab Navigation**: Easy switching between async patterns (5 tabs)
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages
- **Interactive Cards**: Hover effects and animations

## 🧪 How to Use

### Tab 1: JSON Data
- Click "Fetch Users" or "Fetch Posts" to retrieve JSON data
- Click "Create Post" to send JSON payload

### Tab 2: Form Data
- Fill out form fields and optionally upload a file
- Submit to see FormData in action

### Tab 3: Promises
- Test Simple Promise, Promise Chain, Promise.all, and Promise.race
- Observe timing and error handling

### Tab 4: Async/Await
- Run sequential vs parallel operations
- Test retry mechanism and try-catch-finally

### Tab 5: Fish Demo 🐟
- View fish list loaded from local JSON
- Click "Details" to fetch individual fish data
- Upload new fish data via FormData
- Run "Fish Promise" to test promise patterns

## 📚 Learning Resources

- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## 🤝 APIs Used

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free REST API for users/posts
- Local `fish.json` - Sample fish data

## 🐛 Troubleshooting

**Port in use?** Vite will auto-select another port.

**Install fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Week 6 Internship Task - Flexisaf Internship 2025**
