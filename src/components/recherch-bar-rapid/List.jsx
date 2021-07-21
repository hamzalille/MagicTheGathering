import React from "react";
import { withRouter } from "react-router-dom";
import { Result, Mana } from "./recherche-bar-rapid.style";

const List = ({
  name,
  imageUrl,
  manaCost,
  text,
  history,
  cmc,
  type,
  rarity,
  artist,
  clearCards,
}) => {
  const handleClick = () => {
    history.push(`/card/${name}`, {
      name,
      imageUrl,
      manaCost,
      text,
      cmc,
      type,
      rarity,
      artist,
    });
    clearCards();
  };

  return (
    <Result onClick={handleClick}>
      <div className="result-image">
        <img alt="card" src={imageUrl} />
      </div>
      <div className="result-name">
        <p className="card-name">{name}</p>

        <Mana>
          {manaCost
            .replace(/\//g, "")
            .split(/((?!^)\{.*?\})/)
            .filter(Boolean)
            .map((num) => (
              <img src={`/image/mana-icons/${num}.png`} alt="icon" />
            ))}
        </Mana>
      </div>
    </Result>
  );
};

export default withRouter(List);
