
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Teacher's Resource Builder
      </h1>
      <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
        Instantly create lesson plans, worksheets, and more with the power of AI.
      </p>
    </header>
  );
};

export default Header;
