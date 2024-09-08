import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*.ts"],
	dts: true,
	format: ["cjs", "esm"],
	legacyOutput: false,
	shims: true,
	clean: true,
});
