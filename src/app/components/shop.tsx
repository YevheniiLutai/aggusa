'use client';

import { useState } from 'react';
import Counter from './counter';

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

const products = [
  { name: 'GA for one day', price: 30, img: '/item1.png' },
  { name: 'GA for two day', price: 50, img: '/item1.png' },
  { name: 'Party Hat', price: 10, img: '/item1.png' },
  { name: 'Party blower', price: 5, img: '/item2.png' },
  { name: 'Hand Clapper', price: 5, img: '/item3.png' },
  { name: 'Metal Cowbells', price: 10, img: '/item4.png' },
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleItemChange = (item: CartItem) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.name === item.name);
      if (index === -1) {
        if (item.quantity > 0) return [...prev, item];
        return prev;
      } else {
        if (item.quantity > 0) {
          const copy = [...prev];
          copy[index] = item;
          return copy;
        } else {
          return prev.filter((i) => i.name !== item.name);
        }
      }
    });
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Checkout error:', errorText);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Stripe response missing URL:', data);
      }
    } catch (err) {
      console.error('Checkout exception:', err);
    }
  };

  return (
    <>
<div className="buy_wrapper">
  {products.map(({ name, price, img }) => (
    <div key={name} className="buy_block">
      <div className="buy_img">
        <img src={img} alt={name} />
      </div>
      <p className="buy_description">{name}</p>
      <p className="buy_price">${price}</p>
      <div className="buy_counter">
        <Counter name={name} price={price} onChange={handleItemChange} />
      </div>
    </div>
  ))}
</div>

<div className="cart_section">
  <h3>Cart:</h3>
  {cart.length === 0}
  {cart.map(({ name, quantity, price }) => (
    <div key={name}>
      {name} — {quantity} × ${price} = ${quantity * price}
    </div>
  ))}
  {cart.length > 0 && (
    <>
      <h4>
        Total amount: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </h4>
      <button
        onClick={handleCheckout}
        className="checkout checkout_button text-white px-4 py-2 rounded mt-4"
      >
        Checkout
      </button>
    </>
  )}
</div>
    </>
  );
}
