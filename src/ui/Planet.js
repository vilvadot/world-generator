import React, { useState } from "react";

export const Planet = ({ onSelected, isOpen, ...data }) => {
  const { name, age, id, isDestroyed, creationDate, history } = data;

  const handleSelected = () => {
    onSelected(data.id);
  };

  const textStyle = isDestroyed ? "opacity-30" : "opacity-100";
  const latestEventIcon = history.last().icon;
  const icon = !isDestroyed ? "🌎" : latestEventIcon;
  const aliveText = isDestroyed ? "was alive" : "has been alive";
  const background = isOpen ? "bg-indigo-50 hover:bg-indigo-50" : "bg-white";
  const historyColor = (numberOfEvents) => {
    if(numberOfEvents <= 5) return "bg-yellow-200"
    if(numberOfEvents > 5 && numberOfEvents <= 15 ) return "bg-yellow-600"
    if(numberOfEvents > 15 && numberOfEvents <= 30 ) return "bg-red-700"
    return "bg-purple-700"
  }

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer relative ${textStyle} ${background} flex items-center justify-between`}
        key={name}
        onClick={handleSelected}
      >
        {icon} {name} – discovered in {creationDate} A.B.B {aliveText} for {age}{" "}
        years
          <span className={`float-right text-xs text-white rounded-full w-6 h-6 flex items-center justify-center ${historyColor(history.length)}`}>{history.length}</span>
      </li>
    </>
  );
};
