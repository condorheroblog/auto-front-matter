import { describe, expect, it } from "vitest";

import { sum } from "../packages";

describe("test sum function", () => {
	it("1 + 1 = 2", () => {
		const result = sum(1, 1);
		expect(result).toBe((2));
	});
});
