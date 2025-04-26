import map from "./map.ts";
import mat4Zeros from "./mat4Zeros.ts";

/**
 * Returns a randomly-generated `Mat4`. This can be used for testing.
 * 
 * @param low a lower bound on the allowed values.
 * @param high an upper bound on the allowed values.
 */
function mat4Random(low: number = -1e6, high: number = 1e6) {
	const intervalWidth = high - low
	const mat = mat4Zeros()
	return map(mat, () => Math.random() * intervalWidth + low)
}

export default mat4Random