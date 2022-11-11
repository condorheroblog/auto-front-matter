import { describe, expect, it } from "vitest";
import { isCommittedFile } from "../src";

describe("git function", () => {
	it("isCommittedFile", async () => {
		expect(await isCommittedFile(process.cwd(), "xxx.md")).toBe(false);
	});
});
