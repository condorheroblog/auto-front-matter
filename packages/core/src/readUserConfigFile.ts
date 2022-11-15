import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Options, Pattern } from "fast-glob";

import { CONFIG_FILE_NAME, GET_DEFAULT_FRONT_MATTER, WORDS_PER_MINUTE } from "./constant";
import type { NotificationType } from ".";
import { parseUserDir, placeholderHelper } from ".";

export interface TemplateFrontMatter {
	data: Record<string, any>
	content?: string
}

interface UserConfig {
	dirname?: Pattern[]
	globOptions?: Options
	insertLastMod?: boolean
	insertReadTime?: boolean
	newFileIsInsertLastMod?: boolean
	newFileIsInsertReadTime?: boolean
	wordsPerMinute?: number
	template?: TemplateFrontMatter
}

export interface DefaultUserSetting extends Required<UserConfig> {}

/**
 * Read the config file
 */
export const readUserConfigFile = (workspaceFolder: string, Notification: NotificationType) => {
	const configPath = join(workspaceFolder, CONFIG_FILE_NAME);
	if (configPath && existsSync(configPath)) {
		try {
			const localConfig = readFileSync(configPath, "utf8");
			const userConfig: UserConfig = JSON.parse(localConfig);
			const defaultUserSetting: DefaultUserSetting = {} as DefaultUserSetting;

			// set default value
			defaultUserSetting.insertLastMod = userConfig.insertLastMod ?? true;
			defaultUserSetting.insertReadTime = userConfig.insertReadTime ?? true;
			defaultUserSetting.dirname = parseUserDir(userConfig.dirname, workspaceFolder);
			defaultUserSetting.wordsPerMinute = userConfig.wordsPerMinute ?? WORDS_PER_MINUTE;
			if (userConfig?.template?.data?.date)
				userConfig.template.data.date = placeholderHelper(userConfig.template.data.date);

			defaultUserSetting.template = userConfig.template ?? GET_DEFAULT_FRONT_MATTER();

			return defaultUserSetting;
		}
		catch (error) {
			Notification.error(`please check your ${CONFIG_FILE_NAME} file`);
		}
	}
	else {
		Notification.warning(`You have no ${CONFIG_FILE_NAME} file, please create ${CONFIG_FILE_NAME} file in your root project`);
		return undefined;
	}
};
