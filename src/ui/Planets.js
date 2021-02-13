import React from 'react'

export const Planets = ({planets}) => {
  return (
    <ul>
      {planets.map(({ name, creationDate, lifeTime , isDestroyed}) => {
        return (
          <li key={name}>
            {name} - discovered in {creationDate} A.B.B | alive for { lifeTime } years
          </li>
        );
      })}
    </ul>
  );
};
