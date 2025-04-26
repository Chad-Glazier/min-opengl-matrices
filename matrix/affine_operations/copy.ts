import * as pred from "../../type_predicates.ts";
import { SquareMat, RowPoint, ColPoint, RowVec, ColVec } from "../../types.ts";

function copy<T extends SquareMat | RowPoint | ColPoint | RowVec | ColVec>(mat: T): T {	
	if (pred.isSquareMat(mat)) {
		const n = mat.length
		const copied = new Array(n)
		for (let row = 0; row < n; row++) {
			copied[row] = new Array(n)
			for (let col = 0; col < n; col++) {
				copied[row][col] = mat[row][col]
			}
		}
		return copied as T
	}
	if (pred.isColPoint(mat) || pred.isColVec(mat)) {
		const n = mat.length
		const copied = new Array(n)
		for (let row = 0; row < n; row++) {
			copied[row] = mat[row]
		}
		return copied as T
	}
	// it's a row vector or point
	const n = mat[0].length
	const copied = [ new Array(n) ]
	for (let col = 0; col < n; col++) {
		copied[0][col] =  mat[0][col]
	}
	return copied as T
}

export default copy