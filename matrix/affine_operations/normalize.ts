import { Vec } from "../../types.ts"
import norm from "./norm.ts"

function normalize(v: Vec): Vec {
	const magnitude = norm(v)
	return [
		v[0] / magnitude,
		v[1] / magnitude,
		v[2] / magnitude,
		0
	]
}

export default normalize
