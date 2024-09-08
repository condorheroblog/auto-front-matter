import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";
import process from "node:process";
import { input } from "@inquirer/prompts";
import cac from "cac";
import chokidar from "chokidar";
import {
	getDay,
	getFullYear,
	getMonth,
	isAddmdExtension,
	isCommittedFile,
	isEditable,
	isSupportedFile,
	Notification,
	parseUserDir,
	readUserConfigFile,
	toMd,
	updateFrontMatter,
} from "..";
import { version } from "../../package.json";
import { picocolors } from "../helpers";

export function autoFrontMatter() {
	const cli = cac("auto-front-matter");

	cli
		.version(version)
		.option("-c, --config <config>", "Set path to config file")
		.help();

	cli
		.command("watch [dir]", "Real time update your front-matter")
		.action(watch);

	cli
		.command("create", "create a new Markdown file")
		.action(createMdFromTemplate);

	cli.parse();
}

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
				isCommittedFile: await isCommittedFile(root, editFileName),
			});

			if (doc) {
				writeFileSync(path, doc, { encoding: "utf-8" });
				watcher.close().then(() => {
					const relativePath = relative(root, path);
					Notification.info(`${picocolors.green("Successfully")} file ${picocolors.bgCyan(picocolors.white(relativePath))} saved`);
					restart();
				});
			}
		})
			.on("error", error => Notification.error(`Watcher error: ${error}`));
	};
	restart();
	Notification.info(`${picocolors.green("Start listening for changes to .md files")}`);
}

function createMdFromTemplate() {
	const root = process.cwd();
	const userConfig = readUserConfigFile(root, Notification);

	if (!userConfig)
		return;
	input(
		{
			required: true,
			message: "Please input markdown's file name",
			default: `${getFullYear()}-${getMonth()}-${getDay()}.md`,
		},
	)
		.then((answersFileName) => {
			const filePath = isAddmdExtension(answersFileName);
			const absFilePath = join(root, filePath);
			if (existsSync(absFilePath)) {
				Notification.warning(`(${filePath}) file already exist.`);
			}
			else {
				const fileContents = toMd(userConfig.template.content ?? "", userConfig.template.data);
				writeFileSync(absFilePath, fileContents, { encoding: "utf-8" });
				Notification.info(`${picocolors.green("Successfully")} ${picocolors.blue(filePath)} file created.`);
			}
		})
		.catch((error) => {
			Notification.error(error);
		});
}

autoFrontMatter();
