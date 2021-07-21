import React from "react";
import axios from "axios";
import Spinner from "../recherch-bar-rapid/spinner";
import {
  Div,
  CardSection,
  Button,
  Pbutton,
  Img,
  Info,
  Mana,
  Text,
  Line,
  Section,
  DivOfCardSection,
} from "./randomCard.style";

class RandomCard extends React.Component {
  constructor() {
    super();
    this.state = {
      card: [],
      loading: false,
    };
  }

  getCard = async () => {
    this.setState({ loading: true });
    const res = await axios.get(
      "https://api.magicthegathering.io/v1/cards?pageSize=1&random=true"
    );
    this.setState({ card: res.data.cards[0], loading: false });
    if (!this.state.card.imageUrl || !this.state.card.manaCost) {
      this.getCard();
    }
  };

  render() {
    const { loading } = this.state;
    const {
      imageUrl,
      manaCost,
      cmc,
      type,
      rarity,
      artist,
      text,
      name,
    } = this.state.card;
    return (
      <>
        <Div>
          <Section>
            <Pbutton>
              Pendant la majeure partie des vingt-six ans d'existence de Magic,
              l'unité de base de Magic a été le booster. La grande majorité des
              cartes Magic qui ont été ouvertes proviennent d'un booster.
              Pendant des années, pour la plupart des joueurs, ouvrir des
              boosters fut l'essence même des produits Magic. <br />
              Redécouvrez les cartes qui ont ryhtmé les champs de batailles des
              Planeswalkers.
            </Pbutton>
            <Button type="button" onClick={this.getCard}>
              Découvrir une carte
            </Button>
          </Section>
          {loading ? (
            <Spinner />
          ) : (
            <DivOfCardSection>
              {imageUrl && manaCost ? (
                <CardSection>
                  <Img src={imageUrl} alt="" />
                  <Info>
                    <h2>{name}</h2>
                    <Mana>
                      Mana Cost :&nbsp;
                      {manaCost
                        .replace(/\//g, "")
                        .split(/((?!^)\{.*?\})/)
                        .filter(Boolean)
                        .map((num) => (
                          <img
                            key={num}
                            src={`/image/mana-icons/${num}.png`}
                            alt="icon"
                          />
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
                </CardSection>
              ) : null}
            </DivOfCardSection>
          )}
        </Div>
      </>
    );
  }
}

export default RandomCard;
