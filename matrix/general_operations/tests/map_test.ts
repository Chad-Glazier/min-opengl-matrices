import { assertEquals } from "jsr:@std/assert/equals"
import type { Mat4, Point, Vec } from "../../../types.ts"
import { map, map_i } from "../map.ts"
import { copy } from "../copy.ts";

const identity = (x: number) => x
const addOne = (x: number) => x + 1
const scaleByTwo = (x: number) => 2 * x

function assertMatEquals(expected: Mat4, actual: Mat4) {
	expected.forEach((_, rowIdx) => {
		assertEquals(actual[rowIdx], expected[rowIdx])
	})
}

Deno.test("map applied to a vector", () => {
	const v: Vec = [
		1,
		2,
		3,
		0
	]

	for (const fn of [identity, addOne, scaleByTwo]) {
		const expected = v.map(fn)
		expected[3] = 0
		const actual = map(v, fn)
		assertEquals(actual, expected)
	}

	for (const fn of [identity, addOne, scaleByTwo]) {
		const expected = v.map(fn)
		expected[3] = 0
		const actual = copy(v)
		map_i(actual, fn)
		assertEquals(actual, expected)
	}
})

Deno.test("map applied to a point", () => {
	const p: Point = [
		1,
		2,
		3,
		1
	]

	for (const fn of [identity, addOne, scaleByTwo]) {
		const expected = p.map(fn)
		expected[3] = p[3]
		const actual = map(p, fn)
		assertEquals(actual, expected)
	}

	for (const fn of [identity, addOne, scaleByTwo]) {
		const expected = p.map(fn)
		expected[3] = p[3]
		const actual = copy(p)
		map_i(actual, fn)
		assertEquals(actual, expected)
	}
})

Deno.test("map matrix row/column indices are correct", () => {
	let expected: Mat4 = [
		[ 0, 1, 2, 3 ],
		[ 0, 1, 2, 3 ],
		[ 0, 1, 2, 3 ],
		[ 0, 1, 2, 3 ]
	]
	let actual = map(expected, (_, __, colIdx) => colIdx)
	assertMatEquals(expected, actual)

	expected = [
		[ 0, 0, 0, 0 ],
		[ 1, 1, 1, 1 ],
		[ 2, 2, 2, 2 ],
		[ 3, 3, 3, 3 ]
	]
	actual = map(expected, (_, rowIdx) => rowIdx)
	assertMatEquals(expected, actual)
})

Deno.test("map applied to a Mat4", () => {
	const m: Mat4 = [
		[ 1, 5, -2, 8 ],
		[ 2, -8, 3, 6 ],
		[ 2, 0, 0, 91 ],
		[ 2, -8, 3, 6 ]
	]

	for (const fn of [identity, addOne, scaleByTwo]) {
		const expected: Mat4 = m.map(row => row.map(fn)) as Mat4
		const actual = map(m, fn)
		assertMatEquals(expected, actual)
	}
})