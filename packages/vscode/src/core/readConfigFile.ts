import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Options, Pattern } from "fast-glob";
import { window } from "vscode";
import type { Uri } from "vscode";

import { CONFIG_FILE_NAME, WORDS_PER_MINUTE } from "../constant";
import { parseUserDir } from "../helpers";

export interface UserConfig {
	dirname?: Pattern | Pattern[]
	globOptions?: Options
	initialFileInsertLastMod?: boolean
	wordsPerMinute?: number
}

/**
 * Read the config file
 */
export const readConfigFile = (wsFolder: Uri) => {
	const configPath = join(wsFolder.path, CONFIG_FILE_NAME);
	if (configPath && existsSync(configPath)) {
		try {
			const localConfig = readFileSync(configPath, "utf8");
			const userConfig: UserConfig = JSON.parse(localConfig);

			userConfig.dirname = parseUserDir(userConfig.dirname!, wsFolder.path);
			userConfig.wordsPerMinute = userConfig.wordsPerMinute ?? WORDS_PER_MINUTE;

			return userConfig;
		}
		catch (error) {
			window.showErrorMessage(`please check your ${CONFIG_FILE_NAME} file`);
		}
	}
	else {
		window.showWarningMessage(`You have no ${CONFIG_FILE_NAME} file, please create ${CONFIG_FILE_NAME} file in your root project`);
		return undefined;
	}
};
