'use client';

import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [stars, setStars] = useState<Array<{
    left: number;
    top: number;
    delay: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const newStars = Array(50).fill(null).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      opacity: 0.5 + Math.random() * 0.5
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-black to-red-950">
      <div className="stars">
        {stars.map((star, i) => (
          <div 
            key={i} 
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: red;
          border-radius: 50%;
          box-shadow: 0 0 10px red, 0 0 20px red;
          animation: starFloat 3s infinite linear;
        }
        @keyframes starFloat {
          0% {
            transform: translateY(100vh) scale(0);
          }
          50% {
            transform: translateY(50vh) scale(1);
          }
          100% {
            transform: translateY(0) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground; 