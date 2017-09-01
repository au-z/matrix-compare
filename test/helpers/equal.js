const FLOAT_PRECISION = 6;

module.exports = {
  vec2: (glmVec, threeVec, precision = FLOAT_PRECISION) => {
    if(threeVec.toArray) threeVec = threeVec.toArray()      
    expect(threeVec[0]).toBeCloseTo(glmVec[0], precision)
    expect(threeVec[1]).toBeCloseTo(glmVec[1], precision)
  },
  vec3: (glmVec, threeVec, precision = FLOAT_PRECISION) => {
    if(threeVec.toArray) {
      threeVec = threeVec.toArray()
      expect(threeVec[0]).toBeCloseTo(glmVec[0], precision)
      expect(threeVec[1]).toBeCloseTo(glmVec[1], precision)
      expect(threeVec[2]).toBeCloseTo(glmVec[2], precision)
    }
  },
  mat3: (glmMat, threeMat, precision = FLOAT_PRECISION) => {
    let el = threeMat.elements
    expect(el[0]).toBeCloseTo(glmMat[0], precision)
    expect(el[1]).toBeCloseTo(glmMat[1], precision)
    expect(el[2]).toBeCloseTo(glmMat[2], precision)
    expect(el[3]).toBeCloseTo(glmMat[3], precision)
    expect(el[4]).toBeCloseTo(glmMat[4], precision)
    expect(el[5]).toBeCloseTo(glmMat[5], precision)
    expect(el[6]).toBeCloseTo(glmMat[6], precision)
    expect(el[7]).toBeCloseTo(glmMat[7], precision)
    expect(el[8]).toBeCloseTo(glmMat[8], precision)
  },
  mat4: (glmMat, threeMat, precision = FLOAT_PRECISION) => {
    let el = threeMat.elements
    expect(el[0]).toBeCloseTo(glmMat[0], precision)
    expect(el[1]).toBeCloseTo(glmMat[1], precision)
    expect(el[2]).toBeCloseTo(glmMat[2], precision)
    expect(el[3]).toBeCloseTo(glmMat[3], precision)
    expect(el[4]).toBeCloseTo(glmMat[4], precision)
    expect(el[5]).toBeCloseTo(glmMat[5], precision)
    expect(el[6]).toBeCloseTo(glmMat[6], precision)
    expect(el[7]).toBeCloseTo(glmMat[7], precision)
    expect(el[8]).toBeCloseTo(glmMat[8], precision)
    expect(el[9]).toBeCloseTo(glmMat[9], precision)
    expect(el[10]).toBeCloseTo(glmMat[10], precision)
    expect(el[11]).toBeCloseTo(glmMat[11], precision)
    expect(el[12]).toBeCloseTo(glmMat[12], precision)
    expect(el[13]).toBeCloseTo(glmMat[13], precision)
    expect(el[14]).toBeCloseTo(glmMat[14], precision)
    expect(el[15]).toBeCloseTo(glmMat[15], precision)
  },
  quat: (glmQuat, threeQuat, precision = FLOAT_PRECISION) => {
    if(threeQuat.toArray) threeQuat = threeQuat.toArray()
    expect(threeQuat[0]).toBeCloseTo(glmQuat[0], precision)
    expect(threeQuat[1]).toBeCloseTo(glmQuat[1], precision)
    expect(threeQuat[2]).toBeCloseTo(glmQuat[2], precision)
    expect(threeQuat[3]).toBeCloseTo(glmQuat[3], precision)
  }
}