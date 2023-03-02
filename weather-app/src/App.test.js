import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

// Test cases for front end with a wide range of scenarios
describe("Front End Testing", () => {
	test("Renders city form", () => {
		render(<App />);
		const element = screen.getByPlaceholderText("Enter The Name Of The City");
		expect(element).toBeInTheDocument();
	});

	test("Renders country code form", () => {
		render(<App />);
		const element = screen.getByPlaceholderText("Enter The Country Code");
		expect(element).toBeInTheDocument();
	});

	test("Renders submit button", () => {
		render(<App />);
		const element = screen.getByText("Submit");
		expect(element).toBeInTheDocument();
	});

	test("Test to see if submit button works", () => {
		render(<App />);
		fireEvent.change(
			screen.getByPlaceholderText("Enter The Name Of The City"),
			{ target: { value: "london" } }
		);
		fireEvent.change(screen.getByPlaceholderText("Enter The Country Code"), {
			target: { value: "gb" },
		});
		fireEvent.click(screen.getByText("Submit"));
		const element = screen.getByText("Weather Condition:");
		expect(element).toHaveClass("card-title h5");
	});

	test("Test to see whether error message will pop out", () => {
		render(<App />);
		fireEvent.change(
			screen.getByPlaceholderText("Enter The Name Of The City"),
			{ target: { value: "" } }
		);
		fireEvent.change(screen.getByPlaceholderText("Enter The Country Code"), {
			target: { value: "" },
		});
		fireEvent.click(screen.getByText("Submit"));
		const element = screen.getByText("Please Try Again");
		expect(element).toBeInTheDocument();
	});
});
