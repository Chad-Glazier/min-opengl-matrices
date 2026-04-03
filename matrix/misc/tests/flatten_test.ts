import { assertEquals } from "@std/assert/equals";
import flatten from "../flatten.ts";

Deno.test("flatten works", () => {

	const flattened = flatten([
		[3, 2, 0, 1],
		[4, 0, 1, 2],
		[3, 0, 2, 1],
		[9, 2, 3, 1],
	])
	const expected = new Float32Array([
		3, 4, 3, 9,
		2, 0, 0, 2,
		0, 1, 2, 3,
		1, 2, 1, 1
	])
	
	assertEquals(flattened, expected)
})
