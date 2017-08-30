const three = require('three')
const glm = require('gl-matrix')

const Matrix4 = three.Matrix4
const mat4 = glm.mat4

describe('mat4 parity tests', () => {
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
    expect(el[9]).toBeCloseTo(glmMat[9], 6)
    expect(el[10]).toBeCloseTo(glmMat[10], 6)
    expect(el[11]).toBeCloseTo(glmMat[11], 6)
    expect(el[12]).toBeCloseTo(glmMat[12], 6)
    expect(el[13]).toBeCloseTo(glmMat[13], 6)
    expect(el[14]).toBeCloseTo(glmMat[14], 6)
    expect(el[15]).toBeCloseTo(glmMat[15], 6)
  }

  it('mat4.transpose = Matrix4.set', () => {
		let values = [
			1.0, 1.0, 1.0, 3.0,
			1.0, 1.0, 3.0, 3.0,
      1.0, 1.0, 1.0, 3.0,
      1.0, 1.0, 1.0, 1.0,
		]

    let s = mat4.fromValues(...values)
    mat4.transpose(s, s)

		let t = new Matrix4()
		t.set(...values)

    expectEqual(s, t)
	})
})