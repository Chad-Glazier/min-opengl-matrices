import type { Point, Vec } from "../../types.ts"

/**
 * Used to convert a point to a vector. This is equivalent to subtracting the 
 * origin from a point.
 * 
 * @returns a vector representing the displacement of the point from the origin.
 */
function displacement(point: Point): Vec {
	return [
		point[0],
		point[1],
		point[2],
		0
	]
}

export { displacement }
