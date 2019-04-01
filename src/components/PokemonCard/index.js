import React, { memo } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledPokemonCard = styled.article`
  background: transparent;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
  padding: 30px;

  h1,
  span {
    text-transform: capitalize;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

const PokemonCardContainer = styled.div`
  display: flex;
  background: white;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;

  img {
    width: 100%;
  }
`;

const ProfileContent = styled.div``;

export const PokemonCard = memo(function PokemonCard(props) {
  const { name } = props.pokemon;
  const { front_default: image } = props.pokemon.sprites;
  return (
    <StyledPokemonCard>
      <PokemonCardContainer>
        <ProfileImage>
          <img
            src={`${image}`}
            alt={`My chonky fave ${name}`}
            title={`My chonky fave ${name}`}
          />
        </ProfileImage>
        <ProfileContent>
          <h1>{name}</h1>
          <ul>
            <h5>Powers: </h5>
            {props.pokemon.types.map(({ type }) => (
              <p key={type.name}>{type.name}</p>
            ))}
          </ul>
        </ProfileContent>
      </PokemonCardContainer>
    </StyledPokemonCard>
  );
});

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string
        })
      })
    )
  })
};
