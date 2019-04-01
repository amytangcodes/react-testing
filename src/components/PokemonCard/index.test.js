import React from "react";
import { PokemonCard } from "./";
import { render, cleanup } from "react-testing-library";
import { mockPikaData, mockGolemData } from "../../utils/mockData";
import "jest-dom/extend-expect";

describe("Pokemon card component", () => {
  afterEach(cleanup);

  it("renders a pokemon card for a single-type pokemon", () => {
    const { container, debug } = render(
      <PokemonCard pokemon={mockPikaData.data} />
    );
    debug();
    expect(container).toHaveTextContent("pikachu");
    expect(container).toHaveTextContent("electric");
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Pokemon card component", () => {
  afterEach(cleanup);

  it("renders a pokemon card for a multiple-type", () => {
    const { container, debug } = render(
      <PokemonCard pokemon={mockGolemData.data} />
    );
    debug();
    expect(container).toHaveTextContent("golem");
    expect(container).toHaveTextContent("rock");
    expect(container).toHaveTextContent("ground");
    expect(container.firstChild).toMatchSnapshot();
  });
});
