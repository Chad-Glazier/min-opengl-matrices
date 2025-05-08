import type { Point, Vec } from "../../../types.ts"
import { assertEquals } from "jsr:@std/assert/equals"
import { sub, sub_i } from "../sub.ts"

Deno.test("point-point subtraction", () => {
	const p: Point = [ 1, 1, 2, 1 ]
	const q: Point = [ 3, 1, 1, 1 ]
	const expected = [ -2, 0, 1, 0 ]

	const actual = sub(p, q)
	assertEquals(actual, expected)
})

Deno.test("vector-vector subtraction", () => {
	const u: Vec = [1, 2, 3, 0]
	const v: Vec = [2, 5, 1, 0]
	const expected = [-1, -3, 2, 0]

	const actual = sub(u, v)
	assertEquals(actual, expected)

	sub_i(u, v)
	assertEquals(u, expected)
})	

Deno.test("point-vector subtraction", () => {
	const p: Point = [1, -2, 3, 1]
	const d: Vec = [2, 5, 1, 0]
	const expected = [-1, -7, 2, 1]

	const actual = sub(p, d)
	assertEquals(actual, expected)

	sub_i(p, d)
	assertEquals(p, expected)
})
