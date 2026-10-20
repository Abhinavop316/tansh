import React, { useEffect, useState, useRef } from 'react';

function CounterItem({ endValue, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * endValue);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, endValue]);

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-number">
        {count}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatCounter() {
  return (
    <div className="stats-grid">
      <CounterItem endValue={450} suffix="+" label="Visa Applications Handled" />
      <CounterItem endValue={687} suffix="+" label="Satisfied Clients Assisted" />
      <CounterItem endValue={8} suffix="+" label="Global Destination Markets" />
      <CounterItem endValue={98} suffix="%" label="File Verification Success Rate" />
    </div>
  );
}
