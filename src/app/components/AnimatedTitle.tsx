'use client';

const AnimatedTitle = () => {
  return (
    <div className="fixed top-8 w-full text-center z-50">
      <h1 className="glitch-title text-5xl md:text-7xl font-bold text-red-600">
        Otaku Hunters
      </h1>
      <style jsx>{`
        .glitch-title {
          text-shadow: 
            0 0 10px rgba(255,0,0,0.5),
            0 0 20px rgba(255,0,0,0.3),
            0 0 30px rgba(255,0,0,0.2);
          animation: glitch 2s infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow: 
              0 0 10px rgba(255,0,0,0.5),
              0 0 20px rgba(255,0,0,0.3),
              0 0 30px rgba(255,0,0,0.2);
            transform: skew(0deg);
          }
          2% {
            text-shadow: 
              -3px 0 red,
              3px 0 cyan;
            transform: skew(2deg);
          }
          4% {
            text-shadow: 
              3px 0 red,
              -3px 0 cyan;
            transform: skew(-2deg);
          }
          6% {
            text-shadow: 
              0 0 10px rgba(255,0,0,0.5),
              0 0 20px rgba(255,0,0,0.3),
              0 0 30px rgba(255,0,0,0.2);
            transform: skew(0deg);
          }
          100% {
            text-shadow: 
              0 0 10px rgba(255,0,0,0.5),
              0 0 20px rgba(255,0,0,0.3),
              0 0 30px rgba(255,0,0,0.2);
            transform: skew(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedTitle; 