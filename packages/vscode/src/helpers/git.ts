import { basename } from "node:path";
import type { Uri } from "vscode";
import Git from "simple-git";

export const isTrackedFile = async (wsFolder: Uri, fileName: string) => {
	const git = Git(wsFolder.fsPath);
	const statusResult = await git.status();
	const editFile = statusResult.files.find(({ path }) => path === basename(fileName));
	return editFile?.working_dir === "?";
};
