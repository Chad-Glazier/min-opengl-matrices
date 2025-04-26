import err from "../../errors/err.ts";
import { Mat4, Point, Vec } from "../../types.ts";
import { copy } from "../affine_operations/index.ts";
import mat4Identity from "../affine_operations/mat4Identity.ts";
import mult from "../affine_operations/mult.ts";

class ImmutableMatrix {
	private readonly matrix: Mat4;
	private readonly inverseMatrix: ImmutableMatrix;

	constructor()
	constructor(
		matrix: Mat4,
		inverse: ImmutableMatrix | Mat4,
	);
	constructor(
		matrix?: Mat4,
		inverse?: ImmutableMatrix | Mat4,
	) {
		if (inverse === undefined) {
			this.inverseMatrix = new ImmutableMatrix(mat4Identity(), this);
		} else if (inverse instanceof ImmutableMatrix) {
			this.inverseMatrix = inverse;
		} else {
			this.inverseMatrix = new ImmutableMatrix(inverse, this);
		}

		if (matrix === undefined) {
			this.matrix = mat4Identity();
		}  else {
			this.matrix = copy(matrix);
		}
	}

	transform<T extends Vec | Point>(x: T): T {
		return mult(this.matrix, x) as T;
	}

	get(rowIdx: number, colIdx: number): number {
		if (rowIdx > 3 || colIdx > 3 || rowIdx < 0 || colIdx < 0) {
			err(`All \`ImmutableMatrix\` matrices are 4x4. \`get(${rowIdx}, ${colIdx})\` is undefined.`)
			return NaN
		}

		return this.matrix[rowIdx][colIdx];
	}

	getRow(rowIdx: number): [number, number, number, number] {
		if (rowIdx > 4 || rowIdx < 0) {
			err(`All \`ImmutableMatrix\` matrices are 4x4. \`getRow(${rowIdx})\` is undefined.`)
			return [ NaN, NaN, NaN, NaN ]
		}

		const row = new Array(4);
		for (let colIdx = 0; colIdx < 4; colIdx++) {
			row[colIdx] = this.matrix[rowIdx][colIdx];
		}
		return row as [number, number, number, number];
	}

	getCol(colIdx: number): [number, number, number, number] {
		if (colIdx > 4 || colIdx < 0) {
			err(`All \`ImmutableMatrix\` matrices are 4x4. \`getCol(${colIdx})\` is undefined.`)
			return [ NaN, NaN, NaN, NaN ]
		}

		const col = new Array(4);
		for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
			col[rowIdx] = this.matrix[rowIdx][colIdx];
		}
		return col as [number, number, number, number];
	}

	/**
	 * Returns the matrix as a flattened `Float32Array`.
	 */
	toFloat32Array(): Float32Array {
		return new Float32Array(this.matrix.flat());
	}

	/**
	 * Returns a string representation of the matrix.
	 *  
	 * @param precision The number of significant figures to include.
	 * @param name The name of the matrix (which is included in the output).
	 */
	toString(precision: number = 3, name?: string): string {
		let maxLength = 0
		const strings = this.matrix.map(row => {
			return row.map(x => {
				const str = ((Math.round(x * (10 ** precision))) / (10 ** precision)).toString()
				if (str.length > maxLength) {
					maxLength = str.length
				}
				return str
			})
		})
		const leftPad = (str: string, finalLength: number) => {
			while (str.length < finalLength) {
				str = " " + str
			}
			return str
		}
		let output = `----- 4x4 Immutable ${name ? name + " " : ""}Matrix -----\n`
		for (const row of strings) {
			output += "  " + row.map(str => leftPad(str, maxLength)).join("  ")
			output += "\n"
		}
		return output
	}

	/**
	 * Returns the inverse of the matrix. This inverse is computed
	 * analytically, not numerically.
	 */
	get inverse(): ImmutableMatrix {
		return this.inverseMatrix;
	}

	/**
	 * Returns a copy of the underlying matrix. Since this is a copy, mutating
	 * it will not affect the `ImmutableMatrix` instance.
	 */
	get mat(): Mat4 {
		return copy(this.matrix);
	}
}

export default ImmutableMatrix;
