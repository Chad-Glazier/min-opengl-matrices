# Minimal OpenGL Matrices

This library provides a minimal suite of matrices suitable for use in generating OpenGL graphics. E.g.,

```ts
// transform camera coordinates to clip space
const projection = perspective(
	Math.PI / 4,	// field of view along the Y axis (in radians)
	1920 / 1080,	// aspect ratio (width / height)
	0.1,		// the near clipping plane (z = -0.1)
	10		// the far clipping plane (z = -10)
)

// transform world coordinates to camera space
const view = compose(
	rotationAbout("x", Math.PI / 3),
	translation(0, 0, 12)
)

// transform object coordinates to world space
const model = compose(
	rotation(
		[ 1, 1, 0 ],	// the axis of rotation
		Math.PI / 2	// the amount to rotate (in radians)
	),
	scaling(2, 2, 2)	// scale in each direction by 2
)

// transform object coordinates to clip space
// (this should be passed to the vertex shader)
const transformation = compose(projection, view, model)
```

At the time of writing, this library is not optimized for performance.
