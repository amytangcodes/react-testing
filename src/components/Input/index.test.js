import React from "react";
import { Input } from "./";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

describe("input component", () => {
  afterEach(cleanup);

  it("it will trigger the onChange event", () => {
    const expectedValue = "Meowth";
    const handleChangeMockFn = jest.fn(event => {
      expect(event.target.value).toEqual(expectedValue);
    });
    const { getByLabelText, container, debug } = render(
      <Input
        id="input-test"
        label="label-test"
        value=""
        handleChange={handleChangeMockFn}
      />
    );

    debug();
    fireEvent.change(getByLabelText("label-test"), {
      target: { value: expectedValue }
    });
    // expect(getByLabelText("Click Me!")).toBeDisabled();
    expect(handleChangeMockFn).toHaveBeenCalledTimes(1);
  });
});

describe("input component", () => {
  afterEach(cleanup);

  it("it will consume the value from the onChange event target", () => {
    const expectedValue = "Meowth";
    const handleChangeMockFn = jest.fn(event => {
      expect(event.target.value).toEqual(expectedValue);
    });
    const { getByLabelText, container, debug } = render(
      <Input
        id="input-test"
        label="label-test"
        value=""
        handleChange={handleChangeMockFn}
      />
    );

    debug();
    fireEvent.change(getByLabelText("label-test"), {
      target: { value: expectedValue }
    });
  });
});
