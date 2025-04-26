import { Point, Vec } from "../../types.ts"

/**
 * Returns the displacement of a point from its origin. This is equivalent
 * to subtracting the origin from a point.
 * 
 * @param point 
 * @returns 
 */
function displacement(point: Point): Vec {
	return [
		point[0],
		point[1],
		point[2],
		0
	]
}

export default displacement