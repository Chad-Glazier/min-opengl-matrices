import { Point, Vec } from "../../types.ts";
import add from "./add.ts";
import mult from "./mult.ts";
import normalize from "./normalize.ts";
import sub from "./sub.ts"

/**
 * Returns a function that represents the parametric equation of the line
 * between the two points. E.g.,
 * ```
 * const start: Point = [0, 0, 0, 1]  // [x, y, z, 1]
 * const target: Point = [2, -2, 2, 1]
 * const line = parametricLine(start, target)
 * 
 * line(0) 	// returns `start`
 * line(1) 	// returns [1, -1, 1, 1]
 * line(2) 	// returns [2, -2, 2, 1]
 * line(0.5)	// returns [0.5, -0.5, 0.5, 1]
 * line(-1)	// returns [-1, 1, -1, 1]
 * ```
 * 
 * @param start the starting point
 * @param target the second point towards which the line is directed. Positive
 * values for `distanceFromStart` move toward the `target` from the `start`.
 */
function parametricLine(start: Point, target: Point): (distanceFromStart: number) => Point {
	const direction: Vec = normalize(sub(target, start))
	return (distanceFromStart: number) => add(start, mult(distanceFromStart, direction))
}

export default parametricLine