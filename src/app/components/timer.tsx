'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const targetDate = new Date('2025-09-20T12:00:00');
  const [text, setText] = useState("");

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) return null;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const updateText = () => {
      const timeLeft = getTimeRemaining();
      if (!timeLeft) {
        setText("The competition has started!");
      } else {
        setText(
          `Competition starts in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
        );
      }
    };

    updateText();
    const interval = setInterval(updateText, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden timer py-2">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
          <span>{text}&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  );
}