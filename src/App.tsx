import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
        <Button
          onClick={() => setCount((count) => count + 1)}
          className="bg-amber-600 hover:bg-amber-700"
        >
          count is {count}
        </Button>
        <p className="text-gray-400 mt-8 text-sm">
          Vite + React + TypeScript + Tailwind CSS + shadcn/ui
        </p>
      </div>
    </div>
  );
}

export default App;
