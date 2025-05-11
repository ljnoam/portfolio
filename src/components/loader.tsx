"use client";

import { Typewriter } from 'react-simple-typewriter';

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary">
      <h1 className="text-4xl md:text-6xl font-bold">
        <Typewriter
          words={['</>Noam_']}
          loop={1}
          cursor
          cursorStyle='_'
          typeSpeed={150}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
    </div>
  );
}
