import { render, screen, fireEvent, } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "./exampleComponent";

test("counter test, not part of the e-commerce app", () => {
    render(<Counter />)
    expect(screen.getByText("Decrement")).toBeInTheDocument();
})

