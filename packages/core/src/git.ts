import { join } from "node:path";
import Git from "simple-git";

/**
 * is a Untracked File
 * @param workspaceFolder - Sets the working directory of the subsequent commands.
 * @param fileName - file name
 * @returns {boolean}
 */
export const isUntrackedFile = async (workspaceFolder: string, fileName: string) => {
	const git = Git(workspaceFolder);
	const statusResult = await git.status();
	const editFile = statusResult.files.find(
		({ path }) => join(workspaceFolder, path) === fileName,
	);
	return editFile?.working_dir === "?";
};
