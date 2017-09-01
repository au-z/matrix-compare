const three = require('three')
const glm = require('gl-matrix')
const equal = require('./helpers/equal')
const print = require('./helpers/print')

const Matrix3 = three.Matrix3
const Matrix4 = three.Matrix4
const mat3 = glm.mat3
const mat4 = glm.mat4

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
	it('mat3.normalFromMat4() == Matrix3.getNormalMatrix()', () => {
		const a = [
			1, 0, 0, 0, 
			0, 1, 0, 0, 
			0, 0, 1, 0, 
			0, 0, -10000, 1
		];
		const sMat = mat4.fromValues(...a)
		const tMat = new Matrix4().set(...a).transpose()
		equal.mat4(sMat, tMat)

		const s = mat3.normalFromMat4([], sMat)
		const t = new Matrix3().getNormalMatrix(tMat)
		equal.mat3(s,t)
	})
})