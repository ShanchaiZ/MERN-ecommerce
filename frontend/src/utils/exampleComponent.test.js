import { render, screen, fireEvent, } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "./exampleComponent";

test("counter test, not part of the e-commerce app", () => {
    render(<Counter />)
    expect(screen.getByText("Decrement")).toBeInTheDocument();
    const increment = screen.getByText("Increment");
    const decrement = screen.getByText("Decrement");
    const message = screen.getByText(/Current count/);
    fireEvent.click(increment);
    expect(message.textContent).toBe("Current count: 1");
    fireEvent.click(decrement); // result = "0"
    fireEvent.click(decrement); // result = "-1"
    fireEvent.click(decrement); // result = "-2"
    expect(message.textContent).toBe("Current count: -2");
})

