export type Point = [
	x: number, 
	y: number, 
	z: number, 
	w: number
]
export type Vec = [
	x: number, 
	y: number, 
	z: number, 
	0
]
export type RowVec = [
	Vec
]
export type RowPoint = [
	Point
]
export type ColVec = Vec
export type ColPoint = Point
export type Mat4 = [
	[number, number, number, number],
	[number, number, number, number],
	[number, number, number, number],
	[number, number, number, number]
]
export type Mat3 = [
	[number, number, number],
	[number, number, number],
	[number, number, number]
]
export type Mat2 = [
	[number, number],
	[number, number]
]
export type SquareMat = Mat2 | Mat3 | Mat4
export type Shape = {
	vertices: Float32Array,
	indices: Uint16Array
}
