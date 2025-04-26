import { assertEquals } from "jsr:@std/assert/equals"
import transpose from "./transpose.ts"
import {
	ColPoint,
	ColVec,
	Mat2,
	Mat3,
	Mat4,
	RowPoint,
	RowVec,
} from "../../types.ts"

Deno.test("transpose(RowVec): returns ColVec", () => {
	const rowVec: RowVec = [[1, 2, 3, 0]]
	const result = transpose(rowVec)
	const expected: ColVec = [1, 2, 3, 0]
	assertEquals(result, expected)
})

Deno.test("transpose(ColVec): returns RowVec", () => {
	const colVec: ColVec = [1, 2, 3, 0]
	const result = transpose(colVec)
	const expected: RowVec = [[1, 2, 3, 0]]
	assertEquals(result, expected)
})

Deno.test("transpose(RowPoint): returns ColPoint", () => {
	const rowPoint: RowPoint = [[4, 5, 6, 1]]
	const result = transpose(rowPoint)
	const expected: ColPoint = [4, 5, 6, 1]
	assertEquals(result, expected)
})

Deno.test("transpose(ColPoint): returns RowPoint", () => {
	const colPoint: ColPoint = [4, 5, 6, 1]
	const result = transpose(colPoint)
	const expected: RowPoint = [[4, 5, 6, 1]]
	assertEquals(result, expected)
})

Deno.test("transpose(Mat2): transposes 2x2 matrix", () => {
	const m: Mat2 = [
		[1, 2],
		[3, 4],
	]
	const result = transpose(m)
	const expected: Mat2 = [
		[1, 3],
		[2, 4],
	]
	assertEquals(result, expected)
})

Deno.test("transpose(Mat3): transposes 3x3 matrix", () => {
	const m: Mat3 = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	]
	const result = transpose(m)
	const expected: Mat3 = [
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	]
	assertEquals(result, expected)
})

Deno.test("transpose(Mat4): transposes 4x4 matrix", () => {
	const m: Mat4 = [
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 10, 11, 12],
		[13, 14, 15, 16],
	]
	const result = transpose(m)
	const expected: Mat4 = [
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[4, 8, 12, 16],
	]
	assertEquals(result, expected)
})
