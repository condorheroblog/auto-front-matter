import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { CONFIG_FILE_NAME } from "../constant";

/**
 * @param workspaceFolder
 * Create the frontmatter.json file
 */
export const createConfigFile = (workspaceFolder: string) => {
	const initialConfig = {
		name: CONFIG_FILE_NAME,
	};

	if (workspaceFolder) {
		const configPath = join(workspaceFolder, CONFIG_FILE_NAME);
		if (!existsSync(configPath))
			writeFileSync(configPath, JSON.stringify(initialConfig, null, 2), "utf8");
	}
};
