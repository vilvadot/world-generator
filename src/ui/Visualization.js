import React from "react";

export const Visualization = ({ planets, currentPlanet, onPlanetSelected }) => {
  const size = 500;
  const center = {
    x: 250,
    y: 250,
  };
  const starRadius = 30;
  const spaceBetweenPlanets = size / planets.length;

  const handlePlanetSelected = (current) => {
    onPlanetSelected(current);
  };

  const star = (
    <circle
      className="star"
      cx={center.x}
      cy={center.y}
      r={starRadius}
      fill="#FBBF24"
    ></circle>
  );

  return (
    <svg className="universe" width={size} height={size}>
      {star}
      {planets.map((planet, index) => (
        <Planet
          key={planet.id}
          center={center}
          isSelected={planet.id === currentPlanet?.id}
          planet={planet}
          index={index}
          spacing={spaceBetweenPlanets}
          radius={(planet.size * starRadius) / 5}
          starOffset={starRadius * 2}
          onClick={() => handlePlanetSelected(planet)}
        />
      ))}
    </svg>
  );
};

const Planet = ({ planet, index, center, spacing, radius, starOffset, isSelected, onClick }) => {
  const distance = spacing * index;

  const randomAngle = index;
  const x = center.x + starOffset + Math.cos(randomAngle * Math.PI) * distance;
  const y = center.y + starOffset + Math.sin(randomAngle * Math.PI) * distance;

  return (
    <circle
      key={planet.id}
      strokeWidth="3"
      strokeDasharray="2,2"
      stroke={isSelected ? "white" : ""}
      className="planet"
      cx={x}
      cy={y}
      r={radius}
      fill={color(planet.type)}
      onClick={onClick}
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur={`${planet.orbitalPeriod}s`}
        begin="0s"
        from="0 250 250"
        to="360 250 250"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
  );
};

const color = (type) => {
  if (type.isGaseous()) return "#39FFD9";
  if (type.isRocky()) return "#934000";
  if (type.isIce()) return "#91C4FF";
  if (type.isTerrestrial()) return "#10B981";
  if (type.isOcean()) return "#60A5FA";

  return "red";
};
