import { describe, expect, it } from "vitest";
import {
	isUntrackedFile,
} from "../src";

describe("git function", () => {
	it("isUntrackedFile", async () => {
		expect(await isUntrackedFile(process.cwd(), "README.md")).toBe(false);
	});
});
