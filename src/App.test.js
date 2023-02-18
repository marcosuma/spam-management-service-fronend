import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test('renders title "Reports"', () => {
    render(<App />);
    const title = screen.getByText(/Reports/i);
    expect(title).toBeInTheDocument();
  });

  test("renders details in the entry row", async () => {
    render(<App />);
    expect((await screen.findAllByText("Id:"))[0]).toBeInTheDocument();
    expect((await screen.findAllByText("Type:"))[0]).toBeInTheDocument();
    expect((await screen.findAllByText("Message:"))[0]).toBeInTheDocument();
    expect((await screen.findAllByText("State:"))[0]).toBeInTheDocument();
  });
});
