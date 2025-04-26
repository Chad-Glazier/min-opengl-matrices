import { Mat4 } from "../../types.ts";

function getRow(mat: Mat4, rowIndex: number): [number, number, number, number] {
	return mat[rowIndex]
}

export default getRow
