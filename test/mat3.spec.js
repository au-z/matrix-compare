const three = require('three')
const glm = require('gl-matrix')
const equal = require('./helpers/equal')

const Matrix3 = three.Matrix3
const mat3 = glm.mat3

describe('mat3 parity tests', () => {
  it('mat3.transpose = Matrix3.set', () => {
		let values = [
			1.0, 1.0, 3.0,
			1.0, 1.0, 3.0,
			1.0, 1.0, 1.0,
		]

    let s = mat3.fromValues(...values)
    mat3.transpose(s, s)

		let t = new Matrix3()
		t.set(...values)

    equal.mat3(s, t)
	})
})