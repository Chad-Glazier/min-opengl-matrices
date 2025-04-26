import { Mat4 } from "../../../types.ts";
import getCol from "../../affine_operations/getCol.ts";
import ImmutableMatrix from "../ImmutableMatrix.ts";

/**
 * Returns a matrix product. E.g.,
 * ```
 * compose(A, B, C)
 * ``` 
 * returns the matrix product A * (B * C).
 * 
 * @param matrices the matrices to multiply into a single product. If there is
 * no argument given, this function will return the identity matrix.
 * @returns a matrix product.
 */
function compose(...matrices: ImmutableMatrix[]): ImmutableMatrix {
	if (matrices.length == 0) {
		return new ImmutableMatrix();
	}
	if (matrices.length == 1) {
		return matrices[0];
	}

	const product: Mat4 = matrices[matrices.length - 1].mat;

	// iterate over the matrices backwards
	for (let matrixIdx = matrices.length - 2; matrixIdx >= 0; matrixIdx--) {
		const matrix = matrices[matrixIdx];
		for (let col = 0; col < 4; col++) {
			const [b1, b2, b3, b4] = getCol(product, col);
			for (let row = 0; row < 4; row++) {
				const [a1, a2, a3, a4] = matrix.getRow(row);
				product[row][col] = a1 * b1 + a2 * b2 + a3 * b3 + a4 * b4;
			}
		}
	}

	const inverseProduct: Mat4 = matrices[0].inverse.mat;

	// iterate over the matrices forwards for their inverses.
	for (let matrixIdx = 1; matrixIdx < matrices.length; matrixIdx++) {
		const inverse = matrices[matrixIdx].inverse;
		for (let col = 0; col < 4; col++) {
			const [b1, b2, b3, b4] = getCol(inverseProduct, col);
			for (let row = 0; row < 4; row++) {
				const [a1, a2, a3, a4] = inverse.getRow(row);
				inverseProduct[row][col] = a1 * b1 + a2 * b2 + a3 * b3 +
					a4 * b4;
			}
		}
	}

	return new ImmutableMatrix(product, inverseProduct);
}

export default compose;
