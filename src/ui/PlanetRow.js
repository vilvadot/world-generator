import React, { useMemo } from "react";
import { HistoryMarker } from "./HistoryMarker";
import { PlanetIcon } from "./PlanetIcon";

export const PlanetRow = ({ onSelected, isOpen, ...data }) => {
  const { name, age, id, isDestroyed, creationDate, history, type } = data;

  const planetType = type.name;

  const handleSelected = () => {
    onSelected(data.id);
  };

  const textStyle = isDestroyed ? "opacity-30" : "opacity-100";
  const aliveText = isDestroyed ? "was alive" : "has been alive";
  const background = isOpen ? "bg-indigo-50 hover:bg-indigo-50" : "bg-white";

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer relative ${textStyle} ${background} flex items-center justify-between text-left`}
        key={name}
        onClick={handleSelected}
      >
        <p>
          <PlanetIcon type={type} isDestroyed={isDestroyed} />
          <span className="ml-2">
            {name} ({creationDate} A.B.B) {aliveText} for {age} years
          </span>
        </p>
        <HistoryMarker length={history.length} />
      </li>
    </>
  );
};
