import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import bots from "../../../../data/bots.json";
import WorkerTable from "./WorkerTable";
import { Bot } from "../../types";

const mockBot = bots[0] as Bot;

describe("WorkerTable", () => {
  test("renders correct list with data", async () => {
    render(<WorkerTable bot={mockBot} />);
    expect(screen.getByText("Workers")).toBeDefined();
    await waitFor(() => expect(screen.getByText("Worker One")).toBeDefined());
    await waitFor(() => expect(screen.getByText("First Worker")).toBeDefined());
    await waitFor(() =>
      expect(screen.getAllByTestId("worker-logs-btn")).toHaveLength(6)
    );
  });

  test("shows a workers's logs when button is clicked", async () => {
    render(<WorkerTable bot={mockBot} />);
    await screen.findByText("Worker One");
    const button = screen.getAllByTestId("worker-logs-btn")[0];
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText("Logs for Worker One")).toBeDefined()
    );
  });
});
