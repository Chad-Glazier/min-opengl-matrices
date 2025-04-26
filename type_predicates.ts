import * as t from "./types.ts"

export function isPoint(x: unknown): x is t.Point {
	if (!Array.isArray(x)) return false
	if (x.length != 4) return false
	if (Array.isArray(x[0])) return false
	if (x[3] == 0) return false
	return true
}

export function isVec(x: unknown): x is t.Vec {
	if (!Array.isArray(x)) return false
	if (x.length != 4) return false
	if (Array.isArray(x[0])) return false
	if (x[3] != 0) return false
	return true
}

export function isRowVec(x: unknown): x is t.RowVec {
	if (!Array.isArray(x)) return false
	if (x.length != 1) return false
	return isVec(x[0])
}

export function isRowPoint(x: unknown): x is t.RowPoint {
	if (!Array.isArray(x)) return false
	if (x.length != 1) return false
	return isPoint(x[0])
}

export function isColVec(x: unknown): x is t.ColVec {
	return isVec(x)
}

export function isColPoint(x: unknown): x is t.ColPoint {
	return isPoint(x)
}

export function isSquareMat(x: unknown): x is t.SquareMat {
	if (!Array.isArray(x)) return false
	if (!Array.isArray(x[0])) return false
	return x.length == x[0].length
}

export function isMat2(x: unknown): x is t.Mat2 {
	return isSquareMat(x) && x.length == 2
}

export function isMat3(x: unknown): x is t.Mat3 {
	return isSquareMat(x) && x.length == 3
}

export function isMat4(x: unknown): x is t.Mat4 {
	return isSquareMat(x) && x.length == 4
}
