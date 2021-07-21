import React from "react";
import { Link } from "react-router-dom";
import {
  CardContainer,
  Name,
  Details,
  Image,
  Info,
  Mana,
  Text,
  Line,
} from "./carte-description.style";

const Card = ({
  location: {
    state: { name, imageUrl, manaCost, text, cmc, type, rarity, artist },
  },
}) => {
  return (
    <CardContainer>
      <Name>
        <h1>{name}</h1>
      </Name>
      <Details>
        <Image>
          <img src={imageUrl} alt="card" />
        </Image>
        <Info>
          <Mana>
            Mana Cost :&nbsp;
            {manaCost
              .replace(/\//g, "")
              .split(/((?!^)\{.*?\})/)
              .filter(Boolean)
              .map((num) => (
                <img src={`/image/mana-icons/${num}.png`} alt="icon" />
              ))}
          </Mana>
          <Line>
            <p>
              Converted Mana Cost: <b>{cmc}</b>
            </p>
            <p>
              Types: <b>{type}</b>
            </p>
          </Line>
          <Line>
            <p>
              Rarity: <b>{rarity}</b>
            </p>
            <p>
              Artist: <b>{artist}</b>
            </p>
          </Line>
          <Text>
            Card Text : <br />
            <i>
              <b>{text}</b>
            </i>
          </Text>
        </Info>
      </Details>
      <Link to="/" className="btn">
        Back To HomePage
      </Link>
    </CardContainer>
  );
};

export default Card;
