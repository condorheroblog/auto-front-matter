import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Uri } from "vscode";

import { CONFIG_FILE_NAME } from "../constant";

/**
 * @param wsFolder
 * Create the frontmatter.json file
 */
export const createConfigFile = (wsFolder: Uri) => {
	const initialConfig = {
		name: CONFIG_FILE_NAME,
	};

	if (wsFolder) {
		const configPath = join(wsFolder.fsPath, CONFIG_FILE_NAME);
		if (!existsSync(configPath))
			writeFileSync(configPath, JSON.stringify(initialConfig, null, 2), "utf8");
	}
};
