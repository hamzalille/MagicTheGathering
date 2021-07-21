import React from "react";
import axios from "axios";
import Spinner from "./spinner";
import List from "./List";

import {
  SearchContainer,
  Results,
  Input,
  Button,
} from "./recherche-bar-rapid.style";

class RechercheBar extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      text: "",
      loading: false,
    };
  }

  search = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.magicthegathering.io/v1/cards?name=${text}`
    );
    this.setState({ cards: res.data.cards, loading: false });
  };

  //  clear cards
  clearCards = () =>
    this.setState({
      cards: [],
      loading: false,
    });

  onChange = (e) => this.setState({ text: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.search(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { cards, text, loading } = this.state;
    return (
      <SearchContainer>
        <div className="input-container">
          {cards.length > 0 && (
            <Button type="button" onClick={this.clearCards}>
              Clear
            </Button>
          )}
          <form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="text"
              placeholder=" Rapid Card Search..."
              value={text}
              onChange={this.onChange}
            />
          </form>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <Results>
            {cards
              .filter((card, i) => {
                return i < 5;
              })
              .map((card) => {
                if (
                  card.foreignNames.length === 0 ||
                  !card.imageUrl ||
                  !card.manaCost
                ) {
                  return null;
                }
                return (
                  <List key={card.id} {...card} clearCards={this.clearCards} />
                );
              })}
          </Results>
        )}
      </SearchContainer>
    );
  }
}

export default RechercheBar;
