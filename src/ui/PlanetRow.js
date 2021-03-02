import React, { useMemo } from "react";
import { HistoryMarker } from "./HistoryMarker";
import { PlanetIcon } from "./PlanetIcon";

export const PlanetRow = ({ onSelect, isOpen, planet }) => {
  const { name, isDestroyed, creationDate, history, type } = planet;

  return (
    <li
      className={`p-4 bg-indigo-50 hover:bg-gray-50 cursor-pointer relative flex items-center justify-between text-left`}
      onClick={() => {
        onSelect(planet);
      }}
    >
      <p>
        <span className="p-2">{isOpen ? "→" : ""}</span>
        <PlanetIcon type={type} />
        <span className="ml-2">
          {name} ({creationDate} A.B.B.)
        </span>
      </p>
      <HistoryMarker length={history.length} />
    </li>
  );
};
