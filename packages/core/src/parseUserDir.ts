import { join } from "node:path";
import type { Pattern } from "fast-glob";

import { globMdExtension } from ".";

export function parseUserDir(globDir: Pattern | Pattern[] | undefined, workspacePath: string) {
	if (Array.isArray(globDir)) {
		return globDir.map(
			dirItem => join(workspacePath, globMdExtension(dirItem)),
		);
	}

	if (typeof globDir === "string")
		return [join(workspacePath, globMdExtension(globDir))];

	return [join(workspacePath, globMdExtension("."))];
}
