import type { Mat4, Point, Vec } from "../../../types.ts"
import { assertEquals } from "jsr:@std/assert/equals"
import { mult, mult_i } from "../mult.ts"

Deno.test("mult(Mat4, Vec): matrix-vector multiplication", () => {
	const m: Mat4 = [
		[1, 0, 0, 0],
		[0, 2, 0, 0],
		[0, 0, 3, 0],
		[0, 0, 0, 1],
	]
	const v: Vec = [1, 2, 3, 0]
	const result = mult(m, v)
	const expected: Vec = [1, 4, 9, 0]
	assertEquals(result, expected)

	mult_i(m, v)
	assertEquals(v, expected)
})

Deno.test("mult(Mat4, Point): matrix-point multiplication", () => {
	const m: Mat4 = [
		[1, 0, 0, 5],
		[0, 1, 0, 6],
		[0, 0, 1, 7],
		[0, 0, 0, 1],
	]
	const p: Point = [1, 2, 3, 1]
	const result = mult(m, p)
	const expected: Point = [6, 8, 10, 1]
	assertEquals(result, expected)

	mult_i(m, p)
	assertEquals(p, expected)
})

Deno.test("mult(Mat4, Mat4): matrix-matrix multiplication", () => {
	const a: Mat4 = [
		[1, 2, 3, 4],
		[0, 1, 4, 5],
		[0, 0, 1, 6],
		[0, 0, 0, 1],
	]
	const b: Mat4 = [
		[1, 0, 0, 7],
		[0, 1, 0, 8],
		[0, 0, 1, 9],
		[0, 0, 0, 1],
	]
	const result = mult(a, b)
	const expected: Mat4 = [
		[1, 2, 3, 54],
		[0, 1, 4, 49],
		[0, 0, 1, 15],
		[0, 0, 0, 1],
	]
	assertEquals(result, expected)

	mult_i(a, b)
	assertEquals(b, expected)
})

Deno.test("mult(scalar, Vec): scalar-vector multiplication", () => {
	const v: Vec = [1, -2, 3, 0]
	const scalar = 2
	const result = mult(scalar, v)
	const expected: Vec = [2, -4, 6, 0]
	assertEquals(result, expected)

	mult_i(scalar, v)
	assertEquals(v, expected)
})

Deno.test("mult(scalar, Point): scalar-point multiplication", () => {
	const p: Point = [1, 2, 3, 1]
	const scalar = 3
	const result = mult(scalar, p)
	const expected: Point = [3, 6, 9, 1]
	assertEquals(result, expected)

	mult_i(scalar, p)
	assertEquals(p, expected)
})

Deno.test("mult(scalar, Mat4): scalar-matrix multiplication", () => {
	const m: Mat4 = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
	]
	const scalar = 0.5
	const result = mult(scalar, m)
	const expected: Mat4 = [
		[0.5, 1, 1.5, 2],
		[2.5, 3, 3.5, 4],
		[4.5, 5, 5.5, 6],
		[6.5, 7, 7.5, 8],
	]
	assertEquals(result, expected)

	mult_i(scalar, m)
	assertEquals(m, expected)
})
