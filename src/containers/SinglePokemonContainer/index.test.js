import axios from "axios";
import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText
} from "react-testing-library";
import { fetchPokemon, SinglePokemonContainer } from "./";
import { mockPikaData } from "../../utils/mockData";
import "jest-dom/extend-expect";

jest.mock("axios"); // use jest 'auto-mocking' to mock abt calls to axios

describe("SinglePokemonContainer", () => {
  describe("fetchPokemon convenience function", () => {
    it("successfully call the async data fetching function", async () => {
      axios.mockResolvedValue(mockPikaData);
      // want an error then use mockUnresolvedValue()
      const loadingChange = jest.fn();
      const pokemonChange = jest.fn();
      const expectedUrl = "https://pokeapi.co/api/v2/pokemon/pikachu";
      expect.assertions(3);
      await fetchPokemon("pikachu", loadingChange, pokemonChange);
      await expect(axios).toBeCalledWith(expectedUrl);
      expect(loadingChange).toBeCalledWith(false);
      expect(pokemonChange).toBeCalledWith(mockPikaData.data);
    });
  });

  describe("SinglePokemonContainer integration testing", () => {
    afterEach(() => {
      cleanup();
      axios.mockReset();
    });
    it("renders the loading state", () => {
      const originalConsoleError = console.error;
      console.error = jest.fn();
      const { container } = render(
        <SinglePokemonContainer pokemonName={"pikachu"} />
      );
      expect(container).toHaveTextContent("Loading");
      expect(container.firstChild).toMatchSnapshot();
      console.error = originalConsoleError;
    });

    it("renders the loaded data in a PokemonCard component", async () => {
      const originalError = console.error;
      console.error = jest.fn();
      axios.mockResolvedValue(mockPikaData);
      const { getByText, container } = render(
        <SinglePokemonContainer pokemonName={"Pikachu"} />
      );

      await waitForElement(() => getByText("pikachu"));
      expect.assertions(3);
      expect(axios).toHaveBeenCalledTimes(1);
      expect(container.firstChild).toMatchSnapshot();
      expect(container).toHaveTextContent("pikachu");
      console.error = originalError;
    });
  });
});
