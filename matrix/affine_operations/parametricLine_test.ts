import { assertAlmostEquals } from "jsr:@std/assert/almost-equals"
import { Point } from "../../types.ts"
import parametricLine from "./parametricLine.ts"
import norm from "./norm.ts";
import sub from "./sub.ts";

function assertPointAlmostEquals(a: Point, b: Point, epsilon = 1e-6) {
	for (let i = 0; i < 4; i++) {
		assertAlmostEquals(a[i], b[i], epsilon)
	}
}

Deno.test("parametricLine: distance = 0 returns start point", () => {
	const start: Point = [1, 2, 3, 1]
	const target: Point = [4, 6, 3, 1]
	const line = parametricLine(start, target)
	const result = line(0)
	assertPointAlmostEquals(result, start)
})

Deno.test("parametricLine: distance = 5 travels 5 units", () => {
	const start: Point = [0, 0, 0, 1]
	const target: Point = [3, 4, 0, 1]
	const line = parametricLine(start, target)
	const actual = line(5)
	assertAlmostEquals(norm(actual), 5, 1e-6)
})

Deno.test("parametricLine: distance = 10 travels twice the target offset", () => {
	const start: Point = [0, 0, 0, 1]
	const target: Point = [3, 4, 0, 1]
	const line = parametricLine(start, target)
	const result = line(10)
	const expected: Point = [6, 8, 0, 1]
	assertPointAlmostEquals(result, expected)
})

Deno.test("parametricLine: negative distance extrapolates backwards", () => {
	const start: Point = [0, 0, 0, 1]
	const target: Point = [0, 0, 1, 1]
	const line = parametricLine(start, target)
	const result = line(-2)
	const expected: Point = [0, 0, -2, 1]
	assertPointAlmostEquals(result, expected)
})

Deno.test("parametricLine: arbitrary direction and length", () => {
	const start: Point = [1, 1, 1, 1]
	const target: Point = [4, 5, 6, 1]
	const line = parametricLine(start, target)
	const result = line(norm(sub(target, start)))
	const expected = target
	assertPointAlmostEquals(result, expected)
})
