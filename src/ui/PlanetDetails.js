import React from "react";

export const PlanetDetails = (data) => {
  const { history, prosperity, name } = data;

  const prosperityForDate = (date) => {
    return prosperity.getValueInYear(date);
  };

  const currentProsperity = prosperity.getTotal()

  return (
    <>
      <h1 className="text-lg font-bold text-indigo-800 flex justify-between">
        <span>{name}</span>
        <ProsperityIndicator value={currentProsperity} />
      </h1>
      <hr className="my-4"></hr>
      <h2 className="pb-4 font-bold">Past events:</h2>
      <ul className="divide-y divide-gray-100">
        {history
          .reverseMap(({ date, description, icon }) => {
            return (
              <li
                key={date}
                className="list-none flex justify-left items-center"
              >
                <ProsperityIndicator value={prosperityForDate(date)} className="mr-4" />
                {date} A.B.B – {icon} {description}
              </li>
            );
          })
          .reverse()}
      </ul>
    </>
  );
};

const ProsperityIndicator = ({ value, className = "" }) => {
  const color = (value) => {
    if (value < 0) return "bg-black";
    if (value > 1000) return "bg-green-600";
    if (value > 800) return "bg-green-500";
    if (value > 600) return "bg-green-400";
    if (value > 200) return "bg-green-300";
    if (value > 100) return "bg-green-200";

    return "bg-green-100";
  };

  const colorClass = color(value);
  return (
    <div
      className={`h-10 w-10 ${colorClass} text-xs flex items-center justify-center text-white ${className}`}
    >
      {value}
    </div>
  );
};
