import React from "react";
import { Button } from "./";
import { render, cleanup, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

describe("button component", () => {
  afterEach(cleanup);
  it("it will not trigger the onClick event because the button is disabled", () => {
    const handleClickMockFn = jest.fn();
    const { getByText, container, debug } = render(
      <Button
        id="button-test"
        handleClick={handleClickMockFn}
        isDisabled={true}
      >
        Click Me!
      </Button>
    );
    debug();
    fireEvent.click(getByText("Click Me!"));
    expect(getByText("Click Me!")).toBeDisabled();
    expect(handleClickMockFn).not.toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("button component", () => {
  afterEach(cleanup);
  it("it will trigger the onClick event because the button is clicked", () => {
    const handleClickMockFn = jest.fn();
    const { getByText, container, debug } = render(
      <Button
        id="button-test"
        handleClick={handleClickMockFn}
        isDisabled={false}
      >
        Click Me!
      </Button>
    );
    debug();
    fireEvent.click(getByText("Click Me!"));
    // expect(getByText("Click Me!")).not.toBeDisabled();
    expect(getByText("Click Me!")).toBeEnabled();
    expect(handleClickMockFn).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
