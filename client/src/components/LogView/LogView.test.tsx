import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import logs from "../../../../data/logs.json";
import LogView from "./LogView";

const mockLogsLoading = { data: [], loading: true };
const mockLogsLoaded = { data: logs as [], loading: false };
const mockOnClose = vi.fn();

describe("LogView", () => {
  test("renders with data", async () => {
    render(
      <LogView
        visible={true}
        owner="Dummy Bot"
        logs={mockLogsLoaded}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("Logs for Dummy Bot")).toBeDefined();
    expect(screen.getAllByRole("table")).toHaveLength(10);
  });

  test("renders without data", async () => {
    render(
      <LogView
        visible={true}
        owner="Dummy Bot"
        logs={mockLogsLoading}
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("Logs for Dummy Bot")).toBeDefined();
    expect(screen.queryByRole("table")).toBeNull();
  });

  test("should hide dialog when visible prop is false", async () => {
    render(
      <LogView
        visible={false}
        owner="Dummy Bot"
        logs={mockLogsLoaded}
        onClose={mockOnClose}
      />
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
