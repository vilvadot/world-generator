import React, { useState } from "react";

export const Planets = ({ planets }) => {
  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white shadow-xl rounded-lg rounded-lg">
        <ul className="divide-y divide-gray-300">
          {planets.map((planet) => {
            return <Planet key={planet.id} {...planet} />;
          })}
        </ul>
      </div>
    </div>
  );
};

const Planet = ({ name, lifeTime, id, isDestroyed, creationDate, history, prosperityScore}) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const textStyle = isDestroyed ? "opacity-30" : "opacity-100";
  const latestEventIcon = history.last().icon
  const icon = !isDestroyed ? "🌎" : latestEventIcon;
  const aliveText = isDestroyed ? "was alive" : "has been alive";

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer ${textStyle} relative`}
        key={name}
        onClick={toggleExpanded}
      >
        {icon} {name} – discovered in {creationDate} A.B.B {aliveText} for{" "}
        {lifeTime} years
        <div className="absolute -top-1 right-5">{history.map(event => <span>.</span>)}</div>
      </li>
      {isExpanded && (
        <div className="p-4">
        <b>Prosperity: {prosperityScore}</b>
          <h2 className="pb-4 font-bold">Past events:</h2>
          {history.map(event => {
            return <li>{event.date} A.B.B – {event.icon} {event.description}</li>
          })}
        </div>
      )}
    </>
  );
};