import type { SquareMat } from "../../types.ts";

/**
 * Flattens a matrix into a column-major `Float32Array`, which can be passed to
 * OpenGL.
 * 
 * Note that a vector can be flattened directly with `new Float32Array(vec)`.
 */
function flatten(mat: SquareMat): Float32Array {
	const n = mat.length
	const flattened = new Float32Array(n * n)

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			// OpenGL expects matrices to be passed in column-major order, but
			// we use row-major ordering. To fix this, we use the transpose of
			// the matrix (i.e., `mat[j][i]` instead of `mat[i][j]`) 
			flattened[i * n + j] = mat[j][i]
		}
	}

	return flattened
}

export { flatten }