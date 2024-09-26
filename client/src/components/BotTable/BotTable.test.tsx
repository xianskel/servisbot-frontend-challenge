import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import bots from "../../../../data/bots.json";
import BotTable from "./BotTable";

const mockBotsLoading = { data: [], loading: true };
const mockBotsLoaded = { data: bots as [], loading: false };
const mockOnWorkersSelected = vi.fn();

describe("BotTable", () => {
  test("renders with data", async () => {
    render(
      <BotTable
        bots={mockBotsLoaded}
        onWorkersSelected={mockOnWorkersSelected}
      />
    );
    expect(screen.getByText("Bot One")).toBeDefined();
  });

  test("renders without data", async () => {
    render(
      <BotTable
        bots={mockBotsLoading}
        onWorkersSelected={mockOnWorkersSelected}
      />
    );
    expect(screen.getByText("No available options")).toBeDefined();
  });

  test("calls correct callback when worker is selected", async () => {
    render(
      <BotTable
        bots={mockBotsLoaded}
        onWorkersSelected={mockOnWorkersSelected}
      />
    );
    const button = screen.getAllByTestId("bot-workers-btn")[0];
    fireEvent.click(button);
    await waitFor(() => expect(mockOnWorkersSelected).toHaveBeenCalledTimes(1));
  });

  test("shows a bot's logs when button is clicked", async () => {
    render(
      <BotTable
        bots={mockBotsLoaded}
        onWorkersSelected={mockOnWorkersSelected}
      />
    );
    const button = screen.getAllByTestId("bot-logs-btn")[0];
    fireEvent.click(button);
    await waitFor(() =>
      expect(screen.getByText("Logs for Bot One")).toBeDefined()
    );
  });
});
