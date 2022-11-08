import { join } from "node:path";
import type { Pattern } from "fast-glob";

const isAddmdExtension = (dir: string) => dir.endsWith("*.md") ? dir : join(dir, "*.md");

export const parseUserDir = (globDir: Pattern | Pattern[], workspacePath: string) => {
	if (Array.isArray(globDir)) {
		return globDir.map(
			dirItem => join(workspacePath, isAddmdExtension(dirItem)));
	}

	if (typeof globDir === "string")
		return join(workspacePath, isAddmdExtension(globDir));
};
