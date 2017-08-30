const three = require('three')
const glm = require('gl-matrix')

const Matrix3 = three.Matrix3
const mat3 = glm.mat3

describe('mat3 parity tests', () => {
  function expectEqual(glmMat, threeMat) {
    let el = threeMat.elements
    expect(el[0]).toBeCloseTo(glmMat[0], 6)
    expect(el[1]).toBeCloseTo(glmMat[1], 6)
    expect(el[2]).toBeCloseTo(glmMat[2], 6)
    expect(el[3]).toBeCloseTo(glmMat[3], 6)
    expect(el[4]).toBeCloseTo(glmMat[4], 6)
    expect(el[5]).toBeCloseTo(glmMat[5], 6)
    expect(el[6]).toBeCloseTo(glmMat[6], 6)
    expect(el[7]).toBeCloseTo(glmMat[7], 6)
    expect(el[8]).toBeCloseTo(glmMat[8], 6)
  }

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

    expectEqual(s, t)
	})
})