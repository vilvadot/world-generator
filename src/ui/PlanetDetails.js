import React from "react";

export const PlanetDetails = (data) => {
  const { history, prosperity, name } = data;

  const prosperityForDate = (date) => {
    return prosperity.getValueInYear(date);
  };
  return (
    <>
      <h1 className="text-lg font-bold">
        {name} ({prosperity.getTotal()})
      </h1>
      <div className="p-4">
        <h2 className="pb-4 font-bold">Past events:</h2>
        {history.reverseMap(({ date, description, icon }) => {
          return (
            <li key={date} className="list-none flex justify-left align-center">
              <ProsperityIndicator value={prosperityForDate(date)} />
              {date} A.B.B – {icon} {description}
            </li>
          );
        }).reverse()}
      </div>
    </>
  );
};

const ProsperityIndicator = ({ value }) => {
  const color = (value) => {
    if(value <  0) return "bg-black";
    if(value >  1000) return "bg-green-600";
    if(value >  800) return "bg-green-500";
    if(value >  600) return "bg-green-400";
    if(value >  200) return "bg-green-300";
    if(value >  100) return "bg-green-200";

    return "bg-green-100";
  };

  const colorClass = color(value);
  return (
    <div
      className={`h-10 w-10 mr-4 ${colorClass} text-xs flex items-center justify-center text-white`}
    >
      {value}
    </div>
  );
};
