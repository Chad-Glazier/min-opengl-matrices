import { build, emptyDir } from "jsr:@deno/dnt"
import { LIBRARY_NAME } from "./constants.ts"

await emptyDir("./npm");

await build({
	entryPoints: [ "./mod.ts" ],
	outDir: "./npm",
	testPattern: "aaaa", // matches nothing; 
	// I'm skipping tests for the build step because, for some reason, the 
	// testing library fails the type-checking step.
	shims: {
		deno: true,
	},
	package: {
		name: LIBRARY_NAME,
		version: Deno.args[0],
		description:
			"Includes a minimal suite of immutable matrices suitable for OpenGL-" +
			"style graphics transformations.",
		license: "Anti 996",
		repository: {
			type: "git",
			url: "git+https://github.com/Chad-Glazier/min-opengl-matrices",
		},
		bugs: {
			url: "https://github.com/Chad-Glazier/min-opengl-matrices/issues",
		},
	},
	postBuild() {
		Deno.copyFileSync("LICENSE", "npm/LICENSE")
		Deno.copyFileSync("README.md", "npm/README.md")
	},
});
