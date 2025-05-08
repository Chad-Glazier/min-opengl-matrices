# Minimal OpenGL Matrices

This library provides a minimal suite of matrices suitable for use in generating OpenGL graphics.

```ts
import { 
	concat, perspective, rotate, translate, scale 
} from "@min-webgl/matrices"

const projection = perspective(
	Math.PI / 4,	// field of view along the Y axis (in radians)
	1920 / 1080,	// aspect ratio (width / height)
	0.1,			// the near clipping plane (z = -0.1)
	10				// the far clipping plane (z = -10)
)

const view = concat(
	rotate([ 0, 1, 0 ], Math.PI / 3),	// rotate π/3 radians about the y-axis
	translate(0, 0, 12)					// translate 12 units along the z-axis
)

const model = concat(
	rotate([ 1, 1, 0 ], Math.PI / 2),	// rotate π/2 degrees about the line y = x
	scale(2, 2, 2)						// scale in each direction by a factor of 2
)

// combine the model, view, and projection matrices.
const transformation = concat(projection, view, model) 
```

## The `_i` Operations

This library is largely written with performance in mind, however, it is also
meant to be used to write readable code. To this end, functions generally
do not mutate their arguments. This can come at a slight performance cost. In
order to address this, there are also functions that modify values in-place,
slightly saving time and memory. These mutating functions are suffixed with `_i`
to distinguish them from their ordinary, non-mutating equivalents.

For example, consider the `mult` function which returns a matrix product. If
we want to scale a matrix by some factor, we can do it in one of two ways:

```ts
const a: Mat4 = someMatrix(...)
const scaledA = mult(2, a) // multiplies each element of a by 2, and returns the result.
```

Now, `a` is left unchanged and `scaledA` holds the product `2 * a`. But if we
never actually need `a` again and are only concerned with `scaledA`, we could
have used `mult_i`:

```ts
const a: Mat4 = someMatrix(...)
mult_i(2, a) // multiplies each element of a by 2 in place.
```

Now `a` holds the scaled product.

The `_i` functions can be slightly more efficient in both time and memory, but
they tend to make code harder to read. With this in mind, it is recommended
that you only use them in the very performance-intensive parts of your code.

## Matrix Inverses

All functions that create transformation matrices can be used to simultaneously
compute their inverse transformation. E.g.,

```ts
const [ perspective, perspectiveInv ] = perspective(
	Math.PI / 4,	// field of view along the Y axis (in radians)
	1920 / 1080,	// aspect ratio (width / height)
	0.1,			// the near clipping plane (z = -0.1)
	10,				// the far clipping plane (z = -10)
	true 			// signals that we want to compute the inverse
					// (defaults to `false`)
)
```

An equivalent way of doing this would be with the `-Inverse` suffix functions.
E.g.,

```ts
const perspective = perspective(Math.PI / 4, 1920 / 1080, 0.1, 10)
const perspectiveInv = perspectiveInverse(Math.PI / 4, 1920 / 1080, 0.1, 10)
```

These inverses are computed analytically and are much faster than numerical
methods. However, sometimes numerical methods are the best way. In these cases
you can use the `inverse` function which computes the inverse of an arbitrary
$4\times 4$ matrix with the adjugate-determinant formula.

```ts
const someComplicatedMatrix = concat(
	// a bunch of transformations...
)
const someComplicatedMatrixInv = inverse(someComplicatedMatrix)
```
