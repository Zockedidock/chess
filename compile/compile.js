const gulp = require("gulp")
const { Service, project } = require("@wasm/studio-utils")

gulp.task("build", async () => {
	const data = await Service.compileFile(
		project.getFile("../src/Engine/fibonacci.c"),
		"c",
		"wasm",
		"-g -O3"
	)
	const outWasm = project.newFile("../public/fibonacci.wasm", "wasm", true)
	outWasm.setData(data)
})

gulp.task("default", ["build"], async () => {})
