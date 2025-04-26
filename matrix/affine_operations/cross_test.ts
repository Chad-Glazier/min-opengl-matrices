import { assertEquals } from "jsr:@std/assert/equals"
import { Vec } from "../../types.ts"
import cross from "./cross.ts"

Deno.test("cross product of unit x and unit y gives unit z", () => {
	const x: Vec = [1, 0, 0, 0]
	const y: Vec = [0, 1, 0, 0]
	const expected: Vec = [0, 0, 1, 0]
	assertEquals(cross(x, y), expected)
})

Deno.test("cross product of unit y and unit z gives unit x", () => {
	const y: Vec = [0, 1, 0, 0]
	const z: Vec = [0, 0, 1, 0]
	const expected: Vec = [1, 0, 0, 0]
	assertEquals(cross(y, z), expected)
})

Deno.test("cross product of parallel vectors gives zero vector", () => {
	const a: Vec = [2, 2, 2, 0]
	const b: Vec = [4, 4, 4, 0]
	const expected: Vec = [0, 0, 0, 0]
	assertEquals(cross(a, b), expected)
})

Deno.test("cross product of opposite unit vectors", () => {
	const x: Vec = [1, 0, 0, 0]
	const y: Vec = [0, 1, 0, 0]
	const result1 = cross(x, y) // [0, 0, 1, 0]
	const result2 = cross(y, x) // [0, 0, -1, 0]
	assertEquals(result2, [-result1[0], -result1[1], -result1[2], 0])
})

Deno.test("cross product result always has w = 0", () => {
	const u: Vec = [3, -5, 2, 0]
	const v: Vec = [1, 0, 4, 0]
	const result = cross(u, v)
	assertEquals(result[3], 0)
})
