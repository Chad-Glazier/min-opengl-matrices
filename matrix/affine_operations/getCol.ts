import { Mat4 } from "../../types.ts";

function getCol(mat: Mat4, columnIndex: number): [number, number, number, number] {
	return [
		mat[0][columnIndex],
		mat[1][columnIndex],
		mat[2][columnIndex],
		mat[3][columnIndex]
	]
}

export default getCol

