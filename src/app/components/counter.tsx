'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

type CounterProps = {
  name: string;
  price: number;
  onChange?: (item: CartItem) => void;
};

export default function Counter({ name, price, onChange }: CounterProps) {
  const [count, setCount] = useState(0);

  const mainColor = '#FFCB61';

  const updateCount = (newCount: number) => {
    setCount(newCount);
    if (onChange) onChange({ name, quantity: newCount, price });
  };

  return (
    <div
      className="flex items-center space-x-4 p-1 rounded-xl w-fit"
      style={{ backgroundColor: mainColor }}
    >
      <button
        onClick={() => updateCount(Math.max(count - 1, 0))}
        className="p-2 rounded-full hover:opacity-80 transition"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Minus color="black" />
      </button>

      <span className="text-black text-2xl w-8 text-center">{count}</span>

      <button
        onClick={() => updateCount(count + 1)}
        className="p-2 rounded-full hover:opacity-80 transition"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Plus color="black" />
      </button>
    </div>
  );
}

