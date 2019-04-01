import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "react-testing-library";
import { App } from "./";
import { mockPikaData } from "../../utils/mockData";
import "jest-dom/extend-expect";

jest.mock("axios");

describe("app integration tests", () => {
  afterEach(() => {
    cleanup();
    axios.mockReset();
  });

  it("enters text into the form, clicks submits and shows a pokemon", async () => {
    axios.mockResolvedValueOnce(mockPikaData);
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText("Search for a single Pokemon"), {
      target: { value: "Pikachu" }
    });
    fireEvent.click(getByText("Search"));
    await waitForElement(() => getByText("pikachu"));
    fireEvent.change(getByLabelText("Search for a single Pokemon"), {
      target: { value: "Pika" }
    });
    expect.assertions(1);
    expect(axios).toHaveBeenCalledTimes(1);
  });
});
