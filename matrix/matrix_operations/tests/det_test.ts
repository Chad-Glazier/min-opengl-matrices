import { assertEquals } from "jsr:@std/assert"
import type { Mat2, Mat3, Mat4 } from "../../../types.ts"
import { det } from "../det.ts"

Deno.test("det calculates determinant of a 2x2 matrix", () => {
	const m2: Mat2 = [
		[1, 2],
		[3, 4],
	]
	const expected = -2
	assertEquals(det(m2), expected)
})

Deno.test("det calculates determinant of a 3x3 matrix", () => {
	const m3: Mat3 = [
		[6, 1, 1],
		[4, -2, 5],
		[2, 8, 7],
	]
	const expected = -306
	assertEquals(det(m3), expected)
})

Deno.test("det calculates determinant of a 4x4 matrix", () => {
	const m4: Mat4 = [
		[3, 2, 0, 1],
		[4, 0, 1, 2],
		[3, 0, 2, 1],
		[9, 2, 3, 1],
	]
	const expected = 24
	assertEquals(det(m4), expected)
})
