import type { Mat4, Point, Vec } from "../../types.ts";

/**
 * Returns a new vector/point that is transformed by a matrix. This is the same
 * as their matrix-vector product:
 * ```ts
 * const p: Point | Vec, m: Mat4
 * // ...
 * transform(m, p)
 * ```
 * returns the matrix product `m * p` (which is a point/vector).
 *
 * @param transformation: The matrix transformation to be applied to the point/
 * vector.
 * @param original: The original point/vector. This value will not be mutated.
 */
function transform<T extends Vec | Point>(
	transformation: Mat4,
	original: T,
): T {
	const mat = transformation
	const v = original
	return [
		mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * v[2] + mat[0][3] * v[3],
		mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * v[2] + mat[1][3] * v[3],
		mat[2][0] * v[0] + mat[2][1] * v[1] + mat[2][2] * v[2] + mat[2][3] * v[3],
		mat[3][0] * v[0] + mat[3][1] * v[1] + mat[3][2] * v[2] + mat[3][3] * v[3]
	] as T;
}

/**
 * Transforms a vector/point in-place, mutating it.
 * 
 * @param transformation: The matrix transformation to apply (this matrix will
 * be unchanged).
 * @param original: The vector/point to transform (this value will be mutated).
 * @returns a reference to `original`.
 */
function transform_i<T extends Vec | Point>(
  transformation: Mat4,
  original: T,
): T {
	const mat = transformation
	const v = original

	const x = mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * v[2] + mat[0][3] * v[3]
	const y = mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * v[2] + mat[1][3] * v[3]
	const z = mat[2][0] * v[0] + mat[2][1] * v[1] + mat[2][2] * v[2] + mat[2][3] * v[3]
	const w = mat[3][0] * v[0] + mat[3][1] * v[1] + mat[3][2] * v[2] + mat[3][3] * v[3]
	original[0] = x
	original[1] = y
	original[2] = z
	original[3] = w
	
	return original
}

export { transform, transform_i }
