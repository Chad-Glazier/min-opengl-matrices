import { assertEquals } from "jsr:@std/assert/equals"
import { assertNotStrictEquals } from "jsr:@std/assert/not-strict-equals"
import { copy } from "../copy.ts"
import type {
	SquareMat, Vec, Point
} from "../../../types.ts"

Deno.test("copy Mat2", () => {
	const mat: SquareMat = [
		[1, 2],
		[3, 4],
	]
	const copied = copy(mat)
	assertEquals(copied, mat)
	assertNotStrictEquals(copied, mat) // Ensure it's a deep copy
})

Deno.test("copy Mat3", () => {
	const mat: SquareMat = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const copied = copy(mat)
	assertEquals(copied, mat)
	assertNotStrictEquals(copied, mat)
})

Deno.test("copy Mat4", () => {
	const mat: SquareMat = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
	]
	const copied = copy(mat)
	assertEquals(copied, mat)
	assertNotStrictEquals(copied, mat)
})

Deno.test("copy Vec", () => {
	const colVec: Vec = [1, 2, 3, 0]
	const copied = copy(colVec)
	assertEquals(copied, colVec)
	assertNotStrictEquals(copied, colVec)
})

Deno.test("copy Point", () => {
	const colPoint: Point = [1, 2, 3, 1]
	const copied = copy(colPoint)
	assertEquals(copied, colPoint)
	assertNotStrictEquals(copied, colPoint)
})
