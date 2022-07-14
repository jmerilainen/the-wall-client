import { describe, expect, it } from "vitest";
import { createStore } from "./redux";

describe("suite name", () => {
  it("foo", () => {
    const reducer = (state = {}, action) => {
      switch (action.type) {
        case "TEST":
          return { test: true };
        default:
          return state;
      }
    };

    let store = createStore(reducer, { test: false });

    store.dispatch({ type: "TEST" });

    expect(store.getState()).toStrictEqual({ test: true });
  });
});
