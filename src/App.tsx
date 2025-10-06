import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-500 mb-4">
          Blade and Barrel
        </h1>
        <p className="text-gray-300 mb-8">
          Tampa's Premier Barbershop - Coming Soon
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded transition-colors"
        >
          count is {count}
        </button>
        <p className="text-gray-400 mt-8 text-sm">
          Vite + React + TypeScript + Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;
