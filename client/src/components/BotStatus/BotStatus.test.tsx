import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import BotStatus from "./BotStatus";

describe("BotStats", () => {
  test("renders correct for status DISABLED", () => {
    const { asFragment } = render(<BotStatus status="DISABLED"></BotStatus>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders correct for status ENABLED", () => {
    const { asFragment } = render(<BotStatus status="ENABLED"></BotStatus>);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders correct for status PAUSED", () => {
    const { asFragment } = render(<BotStatus status="PAUSED"></BotStatus>);
    expect(asFragment()).toMatchSnapshot();
  });
});
