import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from ".";

describe("Home test", () => {
	it("Home page has hi", () => {
		render(<Home></Home>);
		expect(screen.getByText(/hi/i).textContent).toBe("hi");
	});
});
