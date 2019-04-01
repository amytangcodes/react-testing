import axios from "axios";
import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent
} from "react-testing-library";
import { FormContainer } from "./";
import { mockPikaData } from "../../utils/mockData";
import "jest-dom/extend-expect";

describe("FormContainer tests", () => {
  afterEach(cleanup);

  // Expect: That we call handleSubmit when there is data and isDiabled = false
  it("it calls handleSubmit when there is data and isDiabled is false", () => {
    const handleSubmitMockFn = jest.fn();
    const expectedValue = "Moewth";
    const { getByText, container, debug } = render(
      <FormContainer
        handleSubmit={handleSubmitMockFn}
        handleChange={() => {}}
        isDisabled={false}
        searchInputValue={expectedValue}
      />
    );

    debug();
    fireEvent.click(getByText("Submit"));
    expect(getByText("Submit")).toBeDisabled();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Expect: That we do NOT call handleSubmit when there is data and isDiabled = true
  it("it does not call handleSubmit when there is data and isDiabled is true", () => {
    const handleSubmitMockFn = jest.fn();
    const { getByText, debug, container } = render(
      <FormContainer
        handleSubmit={handleSubmitMockFn}
        handleChange={() => {}}
        isDisabled={true}
        searchInputValue=""
      />
    );

    debug();
    fireEvent.click(getByText("Search"));
    expect(handleSubmitMockFn).not.toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  // Expect: That when we change the input, the onChange handler is called and matches the data we put into the fireEvent.change function.
});
