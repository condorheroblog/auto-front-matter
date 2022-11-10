import { describe, expect, it } from "vitest";
import {
	getDay,
	getFullYear,
	getMonth,
} from "../src";

describe("date function", () => {
	it("getFullYear", () => {
		expect(getFullYear(new Date("2021"))).toMatchInlineSnapshot("2021");
	});

	it("getDay", () => {
		expect(getDay(new Date("2022-10-12"))).toMatchInlineSnapshot("\"12\"");
	});

	it("getMonth", () => {
		expect(getMonth(new Date("2021-8"))).toMatchInlineSnapshot("\"08\"");
	});
});
