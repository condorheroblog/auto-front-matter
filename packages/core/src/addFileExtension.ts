import { join } from "node:path";

export const isAddedExtension = (fileName: string) => fileName.endsWith(".md") ? fileName : `${fileName}.md`;

export const globMdExtension = (dir: string) => dir.endsWith("*.md") ? dir : join(dir, "/**/*.md");
