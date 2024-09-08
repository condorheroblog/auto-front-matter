import { isAbsolute, join } from "node:path";
import Git from "simple-git";

/**
 * Check committed File
 * @param workspaceFolder - Sets the working directory of the subsequent commands.
 * @param fileName - file name
 * @returns {boolean} - true if the file is committed, false otherwise
 */
export async function isCommittedFile(workspaceFolder: string, fileName: string) {
	const git = Git(workspaceFolder);
	const statusResult = await git.status();
	const filePath = isAbsolute(fileName) ? fileName : join(workspaceFolder, fileName);
	const editFile = statusResult.files.find(
		({ path }) => join(workspaceFolder, path) === filePath,
	);
	return editFile?.index === " " && editFile?.working_dir === "M";
}
