import React from "react";

export const Visualization = ({
  planets,
  star,
  currentPlanet,
  onPlanetSelected,
}) => {
  const size = 500;
  const center = {
    x: 250,
    y: 250,
  };
  const zoom = 1.5;
  const starRadius = star.size * zoom;
  const spaceBetweenPlanets = size / planets.length / 2;

  const handlePlanetSelected = (current) => {
    onPlanetSelected(current);
  };

  return (
    <svg className="universe" width={size} height={size}>
      );
      {planets.map((planet, index) => (
        <Planet
          key={planet.id}
          center={center}
          isSelected={planet.id === currentPlanet?.id}
          planet={planet}
          index={index}
          spacing={spaceBetweenPlanets}
          radius={planet.size * zoom}
          starOffset={starRadius * 2}
          onClick={() => handlePlanetSelected(planet)}
        />
      ))}
      <Star radius={starRadius} x={center.x} y={center.y} />
    </svg>
  );
};

const Star = ({ radius, x, y }) => {
  const step = 2;
  return (
    <g>
      <circle cx={x} cy={y} r={radius + step * 1.1} fill="white" opacity=".2" />
      <circle cx={x} cy={y} r={radius + step} fill="#FBBF24" opacity=".2" />
      <circle cx={x} cy={y} r={radius} fill="#FBBF24" />
      <circle cx={x} cy={y} r={radius - step} fill="#D97706" opacity=".2" />
      <circle
        cx={x}
        cy={y}
        r={radius - step * 2.5}
        fill="#D97706"
        opacity=".2"
      />
    </g>
  );
};

const Planet = ({
  planet,
  index,
  center,
  spacing,
  radius,
  starOffset,
  isSelected,
  onClick,
}) => {
  const distance = spacing * index;

  const randomAngle = index;
  const x = center.x + starOffset + Math.cos(randomAngle * Math.PI) * distance;
  const y = center.y + starOffset + Math.sin(randomAngle * Math.PI) * distance;

  const renderCircle = () => {};

  return (
    <g key={planet.id}>
      <circle
        strokeWidth="3"
        strokeDasharray="1,2"
        stroke={isSelected ? "white" : ""}
        cx={x}
        cy={y}
        r={radius}
        fill={color(planet.type)}
      ></circle>
      <circle
        className="planet-selector"
        cx={x}
        cy={y}
        r={radius * 3}
        fill="transparent"
        onClick={onClick}
      ></circle>
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur={`${planet.orbitalPeriod}s`}
        begin="0s"
        from="0 250 250"
        to="360 250 250"
        repeatCount="indefinite"
      ></animateTransform>
    </g>
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
