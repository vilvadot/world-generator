import React from 'react'

export const SystemRow = ({system, onSelect, isOpen}) => {
  return (
    <li
      className={`p-4 hover:bg-gray-50 cursor-pointer relative flex items-center justify-between text-left`}
      onClick={() => onSelect(system)}
    >
      <p className={isOpen ? "text-indigo-500" : "text-gray-400"}>
        <span className="p-2">{isOpen ? "→" : ""}</span>
        {system.name}
      </p>
      <span
        className={`float-right text-xs text-white rounded-full w-6 h-6 flex items-center justify-center bg-black`}
      >
        {system.knownPlanets.length}
      </span>
    </li>
  );
};
