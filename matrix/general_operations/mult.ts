import type { Point, Vec, Mat4, Vec4 } from "../../types.ts"

/**
 * Scales a matrix by a number. When scaling points, the last coordinate `w` is
 * left unchanged.
 * 
 * @param scalar: The scalar value to multiply each element by.
 * @param mat: The matrix to scale.
 * @returns a new matrix (with the same dimensionality as `mat`) representing
 * the product `scalar * mat`.
 */
function mult<T extends Point | Vec | Mat4>(scalar: number, mat: T): T 
/**
 * Transforms a vector/point, returning a new vector of the same kind.
 * 
 * @param transformation: The (affine) matrix transformation to apply to the
 * point/vector.
 * @param x: The point/vector to transform (this value will not be unchanged).
 */
function mult<T extends Vec | Point>(transformation: Mat4, x: T): T
/**
 * Calculates the product of two matrices, returning a new matrix of the same
 * dimensionality.
 */
function mult(a: Mat4, b: Mat4): Mat4
function mult(a: Mat4 | number, b: Mat4 | Vec | Point): Mat4 | Vec | Point {
	if (!Array.isArray(a)) {
		// `a` is a scalar.

		if (Array.isArray(b[0])) {
			// `b` is a `Mat4`.
			const mat = b as Mat4
			return [
				[ a * mat[0][0], a * mat[0][1], a * mat[0][2], a * mat[0][3] ],
				[ a * mat[1][0], a * mat[1][1], a * mat[1][2], a * mat[1][3] ],
				[ a * mat[2][0], a * mat[2][1], a * mat[2][2], a * mat[2][3] ],
				[ a * mat[3][0], a * mat[3][1], a * mat[3][2], a * mat[3][3] ]
			]
		}

		// `b` is a `Point` or a `Vec`
		const vec = b as Vec4
		return [
			a * vec[0],
			a * vec[1],
			a * vec[2],
			vec[3]
		]
	}

	// `a` is a matrix.

	if (!Array.isArray(b[0])) {
		// `b` is a `Point` or `Vec`
		const mat = a as Mat4
		const v = b as Vec4
		return [
			mat[0][0] * v[0] + mat[0][1] * v[1] + mat[0][2] * v[2] + mat[0][3] * v[3],
			mat[1][0] * v[0] + mat[1][1] * v[1] + mat[1][2] * v[2] + mat[1][3] * v[3],
			mat[2][0] * v[0] + mat[2][1] * v[1] + mat[2][2] * v[2] + mat[2][3] * v[3],
			mat[3][0] * v[0] + mat[3][1] * v[1] + mat[3][2] * v[2] + mat[3][3] * v[3]
		]
	}

	// `a` and `b` are both `Mat4`.
	const left = a as Mat4
	const right = b as Mat4
	const product: Mat4 = [
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	]
	for (let row = 0; row < 4; row++) {
		for (let col = 0; col < 4; col++) {
			product[row][col] = 
				left[row][0] * right[0][col] +
				left[row][1] * right[1][col] +
				left[row][2] * right[2][col] +
				left[row][3] * right[3][col]
		}
	}
	return product
}

/**
 * Scales a matrix by a number. When scaling points, the last coordinate `w` is
 * left unchanged.
 * 
 * @param scalar: The scalar value to multiply each element by.
 * @param mat: The matrix to scale (this value will be mutated).
 * @returns a reference to `mat`, which is now changed.
 */
function mult_i<T extends Point | Vec | Mat4>(scalar: number, mat: T): T 
/**
 * Transforms a vector/point and returns it.
 * 
 * @param transformation: The (affine) matrix transformation to apply to the
 * point/vector.
 * @param x: The point/vector to transform (this value will be mutated).
 * @returns a reference to `x`.
 */
function mult_i<T extends Vec | Point>(transformation: Mat4, x: T): T
/**
 * Calculates the product of two matrices, storing it in the second/right
 * matrix.
 * 
 * @param a: The left matrix in the product.
 * @param b: The right matrix in the product (this value will be mutated).
 * @returns a reference to `b`.
 */
function mult_i(a: Mat4, b: Mat4): Mat4
function mult_i(a: Mat4 | number, b: Mat4 | Vec | Point): Mat4 | Vec | Point {
	if (!Array.isArray(a)) {
		// `a` is a scalar.

		if (Array.isArray(b[0])) {
			// `b` is a `Mat4`.
			const mat = b as Mat4

			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					mat[row][col] *= a
				}
			}

			return mat
		}

		// `b` is a `Point` or a `Vec`
		const vec = b as Vec4

		vec[0] *= a
		vec[1] *= a
		vec[2] *= a
		
		return vec
	}

	// `a` is a matrix.

	if (!Array.isArray(b[0])) {
		// `b` is a `Point` or `Vec`
		const mat = a as Mat4
		const v = b as Vec4
		
		for (let row = 0; row < 4; row++) {
			v[row] = 
				mat[row][0] * v[0] +
				mat[row][1] * v[1] +
				mat[row][2] * v[2] +
				mat[row][3] * v[3]
		}

		return v
	}

	// `a` and `b` are both `Mat4`.
	const left = a as Mat4
	const right = b as Mat4
	const rightCol = [ 0, 0, 0, 0 ]
	
	for (let col = 0; col < 4; col++) {
		rightCol[0] = right[0][col]
		rightCol[1] = right[1][col]
		rightCol[2] = right[2][col]
		rightCol[3] = right[3][col]
		for (let row = 0; row < 4; row++) {
			right[row][col] =
				left[row][0] * rightCol[0] +
				left[row][1] * rightCol[1] +
				left[row][2] * rightCol[2] +
				left[row][3] * rightCol[3] 
		}
	}

	return right
}

export { mult, mult_i }
