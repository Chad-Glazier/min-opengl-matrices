import { Vec, Point } from "../../types.ts"

function norm(v: Vec | Point): number {
	const dotSquare = v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
	return Math.sqrt(dotSquare)
}

export default norm
