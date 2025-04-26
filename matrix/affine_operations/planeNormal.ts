import err from "../../errors/err.ts"
import { sub, cross, mult, norm, add, normalize } from "./index.ts"
import { Point, Vec } from "../../types.ts"
import displacement from "./displacement.ts";
import dot from "./dot.ts";

/**
 * Given three vertices that don't lie on the same line (i.e., you can form a
 * triangle from them), this function returns a unit-length vector that is
 * normal to the plane the points lie on.
 * 
 * For example, imagine that you have a convex 3D object centered around the 
 * origin and defined by vertices that form triangles. For each triangle, you 
 * can find its normal vectors via
 * ```
 * const triangle = [ p1, p2, p3 ]
 * const [ outwardNormal, inwardNormal ] = planeNormal(...triangle, [0, 0, 0, 1])
 * ```
 * (If the object is not convex, then a more sophisticated method is required.)
 * 
 * @param p1 
 * @param p2 
 * @param p3 
 * @param objectCenter Each plane has two normal vector directions: one 
 * pointing "inside," and one pointing "outside."  This argument indicates
 * where an inside point is, so that the function can determine which normal
 * is pointing towards it (meaning that the normal is inside) and which is
 * not (i.e., the outward-pointing normal).
 */
function planeNormal(
	p1: Point,
	p2: Point,
	p3: Point,
	objectCenter: Point
): [ outward: Vec, inward: Vec ] {
	const u = sub(p2, p1)
	const v = sub(p3, p1)
	const normal = cross(u, v)

	if (norm(normal) == 0) {
		err(`Attempted to get the normal of a plane defined by the points
${p1}, ${p2}, and ${p3}.
This is not allowed because the points all lie on the same line, and therefore do not form a plane.`)
	}

	let outward: Vec = normal
	let inward: Vec = mult(-1, normal)

	const triangleCenter = mult(1 / 3, [p1, p2, p3].map(displacement).reduce(add))
	const outwardDirection = sub(triangleCenter, objectCenter)

	if (dot(outwardDirection, outward) < 0) {
		[ outward, inward ] = [ inward, outward ]
	}

	return [ normalize(outward), normalize(inward) ]
}

export default planeNormal
