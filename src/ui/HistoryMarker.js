import React from "react";

export const HistoryMarker = ({ length }) => {
  const historyColor = (numberOfEvents) => {
    if (numberOfEvents <= 5)
      return "bg-yellow-200";
    if (numberOfEvents > 5 && numberOfEvents <= 15)
      return "bg-yellow-600";
    if (numberOfEvents > 15 && numberOfEvents <= 30)
      return "bg-red-700";
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
