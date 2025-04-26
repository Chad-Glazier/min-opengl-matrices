import { RowVec, ColVec, RowPoint, ColPoint, SquareMat } from "../../types.ts";
import * as pred from "../../type_predicates.ts"

function transpose(v: RowVec): ColVec
function transpose(v: ColVec): RowVec
function transpose(p: RowPoint): ColPoint
function transpose(p: ColPoint): RowPoint
function transpose<T extends SquareMat>(m: T): T
function transpose<T extends SquareMat | RowVec | ColVec | RowPoint | ColPoint>(
	mat: T
): SquareMat | RowVec | ColVec | RowPoint | ColPoint
{
	if (pred.isColVec(mat)) {
		return [ mat ]
	}
	if (pred.isColPoint(mat)) {
		return [ mat ]
	}
	if (pred.isRowVec(mat)) {
		return mat[0]
	}
	if (pred.isRowPoint(mat)) {
		return mat[0]
	}
	const n = mat.length
	const transposed = new Array(n)
	for (let row = 0; row < n; row++) {
		transposed[row] = new Array(n)
	}
	for (let row = 0; row < n; row++) {
		for (let col = 0; col < n; col++) {
			transposed[row][col] = mat[col][row]
		}
	}
	return transposed as T
}

export default transpose
