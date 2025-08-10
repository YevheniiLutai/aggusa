'use client';

import { useState } from 'react';

export default function Address() {
  const [copied, setCopied] = useState(false);
  const address = "1601 San Elijo Rd, San Marcos, CA 92078";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
  };

  return (
    <div
      className="address group cursor-grab relative"
      onClick={handleCopy}
    >
      <p className="address_text font-bold text-center">
        Address: {address}
      </p>
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {copied ? "Copied!" : "Click to copy"}
      </span>
      <div className="map mt-2">
        <img src="/map.png" alt={address} className="w-full h-auto rounded" />
      </div>
    </div>
  );
}
