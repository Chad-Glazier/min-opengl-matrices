import { Point, Vec } from "../../types.ts"
import { assertEquals } from "jsr:@std/assert/equals"
import add from "./add.ts"

Deno.test("vector-vector addition", () => {
	const u: Vec = [1, 2, 3, 0]
	const v: Vec = [2, 5, 1, 0]
	const actual = add(u, v)
	const expected = [3, 7, 4, 0]
	assertEquals(actual, expected)
})

Deno.test("point-vector addition", () => {
	const p: Point = [1, -2, 3, 1]
	const d: Vec = [2, 5, 1, 0]
	const actual = add(p, d)
	const expected = [3, 3, 4, 1]
	assertEquals(actual, expected)
})
