import React, { useMemo } from "react";

export const PlanetRow = ({ onSelected, isOpen, ...data }) => {
  const { name, age, id, isDestroyed, creationDate, history } = data;

  const handleSelected = () => {
    onSelected(data.id);
  };

  const textStyle = isDestroyed ? "opacity-30" : "opacity-100";
  const icon = !isDestroyed ? "🌎" : "⚪️";
  const aliveText = isDestroyed ? "was alive" : "has been alive";
  const background = isOpen ? "bg-indigo-50 hover:bg-indigo-50" : "bg-white";

  const randomNumberBetween = (minimum, maximum) => {
    minimum = Math.ceil(minimum);
    maximum = Math.floor(maximum);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  };

  const hueRotation = useMemo(() => randomNumberBetween(0, 360), [id]);

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer relative ${textStyle} ${background} flex items-center justify-between text-left`}
        key={name}
        onClick={handleSelected}
      >
        <p>
          <span
            style={{
              filter: `hue-rotate(${hueRotation}deg)`,
            }}
          >
            {icon}
          </span>
          <span className="pl-2">
            {name} – discovered in {creationDate} A.B.B {aliveText} for {age}{" "}
            years
          </span>
        </p>
        <HistoryMarker length={history.length} />
      </li>
    </>
  );
};

const HistoryMarker = ({ length }) => {
  const historyColor = (numberOfEvents) => {
    if (numberOfEvents <= 5) return "bg-yellow-200";
    if (numberOfEvents > 5 && numberOfEvents <= 15) return "bg-yellow-600";
    if (numberOfEvents > 15 && numberOfEvents <= 30) return "bg-red-700";
    return "bg-purple-700";
  };
  
  return (
    <span
      className={`float-right text-xs text-white rounded-full w-6 h-6 flex items-center justify-center ${historyColor(
        length
      )}`}
    >
      {length}
    </span>
  );
};
