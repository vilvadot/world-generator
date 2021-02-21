import React from "react";

export const PlanetIcon = ({ type }) => {
  const getIcon = (type) => {
    if (type.isGaseous()) return { emoji: "🌕", hue: 90 };
    if (type.isRocky()) return { emoji: "🌎", hue: 200 };
    if (type.isIce()) return { emoji: "🌕", hue: 140 };
    if (type.isTerrestrial()) return { emoji: "🌍", hue: 0 };
    if (type.isOcean()) return { emoji: "🌑", hue: 290 };

    return { emoji: "⚠️", hue: 0 };
  };

  const { hue, emoji } = getIcon(type);

  return (
    <span
      style={{
        filter: `hue-rotate(${hue}deg)`,
      }}
    >
      {emoji}
    </span>
  );
};
