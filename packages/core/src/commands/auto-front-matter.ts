import { basename, extname, relative } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import cac from "cac";
import chokidar from "chokidar";
import {
	Notification,
	isEditable,
	isSupportedFile,
	isUntrackedFile,
	parseUserDir,
	readUserConfigFile,
	updateFrontMatter,
} from "..";
import { version } from "../../package.json";

export const autoFrontMatter = () => {
	const cli = cac("auto-front-matter");

	cli
		.version(version)
		.option("-c, --config <config>", "Set path to config file")
		.help();

	cli
		.command("watch [dir]", "Real time update your front-matter")
		.action(watch);

	cli
		.command("create <fileName>", "create a new Markdown file")
		.action((fileName: string) => { Notification.error(fileName); });

	cli.parse();
};

function watch(dir: string) {
	const root = process.cwd();
	const userConfig = readUserConfigFile(root, Notification);

	if (!userConfig)
		return;

	if (dir) {
		const dirname = parseUserDir(dir, root);
		userConfig.dirname = dirname;
	}

	const restart = () => {
		const watcher = chokidar.watch(userConfig.dirname, {
			ignored: /node_modules/,
			ignoreInitial: true,
		});
		watcher.on("change", async (path) => {
			const editFileName = basename(path);
			const editFileContents = readFileSync(path, "utf8");
			const languageId = extname(path).slice(1);

			const doc = updateFrontMatter({
				workspaceFolder: root,
				userConfig,
				isSupportedFile: isSupportedFile(languageId),
				isEditable: isEditable(userConfig.dirname, userConfig.globOptions, editFileName),
				editFileName,
				editFileContents,
				lineCount: Infinity,
				isUntrackedFile: await isUntrackedFile(root, editFileName),
			});

			if (doc) {
				writeFileSync(path, doc, { encoding: "utf-8" });
				watcher.close().then(() => {
					Notification.info(`\u001B[32m Successfully\u001B[39m file \u001B[37;46m${relative(root, path)}\u001B[39;49m saved`);
					restart();
				});
			}
		})
			.on("error", error => Notification.error(`Watcher error: ${error}`));
	};
	restart();
}

autoFrontMatter();
