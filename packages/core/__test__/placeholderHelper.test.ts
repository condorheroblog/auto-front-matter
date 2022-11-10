import { describe, expect, it } from "vitest";
import {
	placeholderHelper,
} from "../src";

describe("placeholderHelper function", () => {
	it("now", () => {
		const now = "current time {{now}}";
		expect(placeholderHelper(now) === now).toBe(false);
	});

	it("year", () => {
		const year = "current year {{year}}";
		expect(placeholderHelper(year) === year).toBe(false);
	});

	it("month", () => {
		const month = "current month {{month}}";
		expect(placeholderHelper(month) === month).toBe(false);
	});

	it("day", () => {
		const day = "current day {{day}}";
		expect(placeholderHelper(day) === day).toBe(false);
	});
});
