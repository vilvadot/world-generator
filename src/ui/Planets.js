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

const Planet = ({ name, lifeTime, id, isDestroyed, creationDate }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const textStyle = isDestroyed ? "text-yellow-500" : "text-black";
  const icon = !isDestroyed ? "🌎" : "☄️";
  const aliveText = isDestroyed ? "was alive" : "has been alive";

  return (
    <>
      <li
        className={`p-4 hover:bg-gray-50 cursor-pointer ${textStyle}`}
        key={name}
        onClick={toggleExpanded}
      >
        {icon} {name} - discovered in {creationDate} A.B.B {aliveText} for{" "}
        {lifeTime} years
      </li>
      {isExpanded && (
        <div className="p-4">
          <small>id: {id}</small>
        </div>
      )}
    </>
  );
};