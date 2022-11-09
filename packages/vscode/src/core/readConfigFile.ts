import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Options, Pattern } from "fast-glob";
import { window } from "vscode";
import type { Uri } from "vscode";

import { CONFIG_FILE_NAME, TEMPLATE_FRONT_MATTER, WORDS_PER_MINUTE } from "../constant";
import { parseUserDir, placeholderHelper } from "../helpers";

export interface TemplateFrontMatter {
	data: Record<string, any>
	content?: string
}

export interface UserConfig {
	dirname: Pattern | Pattern[]
	globOptions?: Options
	insertLastMod: boolean
	insertReadTime: boolean
	newFileIsInsertLastMod: boolean
	newFileIsInsertReadTime: boolean
	wordsPerMinute: number
	template: TemplateFrontMatter
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

			// set default value
			userConfig.insertLastMod = userConfig.insertLastMod ?? true;
			userConfig.insertReadTime = userConfig.insertReadTime ?? true;
			userConfig.dirname = parseUserDir(userConfig.dirname, wsFolder.path);
			userConfig.wordsPerMinute = userConfig.wordsPerMinute ?? WORDS_PER_MINUTE;
			if (userConfig?.template?.data?.date)
				userConfig.template.data.date = placeholderHelper(userConfig.template.data.date);

			userConfig.template = userConfig.template ?? TEMPLATE_FRONT_MATTER;

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
