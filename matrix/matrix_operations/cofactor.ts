import type { SquareMat } from "../../types.ts";
import { minor } from "./minor.ts";

/**
 * Returns the cofactor of a specific entry in a matrix.
 * 
 * @param matrix 
 * @param rowIndex 
 * @param columnIndex 
 */
function cofactor(matrix: SquareMat, rowIndex: number, columnIndex: number): number {
	const sign = (rowIndex + columnIndex) % 2 === 0 ? 1 : -1
	return sign * minor(rowIndex, columnIndex, matrix)
}

export { cofactor }
