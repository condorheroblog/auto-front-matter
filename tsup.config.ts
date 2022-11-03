import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/*.ts"],
	dts: true,
	format: ["cjs", "esm"],
	shims: true,
	clean: true,
});
