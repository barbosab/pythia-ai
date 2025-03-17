import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../components/App";

describe("App Component", () => {
  test("renders the App component", () => {
    render(<App />);
    const headingElement = screen.getByText(/Let's build a personal ai!!!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the TextSender component", () => {
    render(<App />);
    const textSenderElement = screen.getByRole("textbox");
    expect(textSenderElement).toBeInTheDocument();
  });
});
