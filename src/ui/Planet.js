import React, { useState } from "react";

export const Planet = ({onSelected, ...data}) => {
  const {
    name,
    age,
    id,
    isDestroyed,
    creationDate,
    history,
    prosperityScore,
  } = data;
  const [isSelected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!isSelected);
    onSelected(data);
  };

  const textStyle = isDestroyed ? "opacity-30" : "opacity-100";
  const latestEventIcon = history.last().icon;
  const icon = !isDestroyed ? "🌎" : latestEventIcon;
  const aliveText = isDestroyed ? "was alive" : "has been alive";
  const background = isSelected
    ? "bg-indigo-50 hover:bg-indigo-50"
    : "bg-white";

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer relative ${textStyle} ${background}`}
        key={name}
        onClick={handleSelected}
      >
        {icon} {name} – discovered in {creationDate} A.B.B {aliveText} for {age}{" "}
        years
        <div className="absolute -top-1 right-5">
          {history.map((event) => (
            <span>.</span>
          ))}
        </div>
      </li>
    </>
  );
};
