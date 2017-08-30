const FLOAT_PRECISION = 6;

module.exports = {
  vec2: (glmVec, threeVec) => {
    if(threeVec.toArray) threeVec = threeVec.toArray()      
    expect(threeVec[0]).toBeCloseTo(glmVec[0], FLOAT_PRECISION)
    expect(threeVec[1]).toBeCloseTo(glmVec[1], FLOAT_PRECISION)
  },
  vec3: (glmVec, threeVec) => {
    if(threeVec.toArray) threeVec = threeVec.toArray()
    expect(threeVec[0]).toBeCloseTo(glmVec[0], FLOAT_PRECISION)
    expect(threeVec[1]).toBeCloseTo(glmVec[1], FLOAT_PRECISION)
    expect(threeVec[2]).toBeCloseTo(glmVec[2], FLOAT_PRECISION)
  },
  mat3: (glmMat, threeMat) => {
    let el = threeMat.elements
    expect(el[0]).toBeCloseTo(glmMat[0], FLOAT_PRECISION)
    expect(el[1]).toBeCloseTo(glmMat[1], FLOAT_PRECISION)
    expect(el[2]).toBeCloseTo(glmMat[2], FLOAT_PRECISION)
    expect(el[3]).toBeCloseTo(glmMat[3], FLOAT_PRECISION)
    expect(el[4]).toBeCloseTo(glmMat[4], FLOAT_PRECISION)
    expect(el[5]).toBeCloseTo(glmMat[5], FLOAT_PRECISION)
    expect(el[6]).toBeCloseTo(glmMat[6], FLOAT_PRECISION)
    expect(el[7]).toBeCloseTo(glmMat[7], FLOAT_PRECISION)
    expect(el[8]).toBeCloseTo(glmMat[8], FLOAT_PRECISION)
  },
  mat4: (glmMat, threeMat) => {
    let el = threeMat.elements
    expect(el[0]).toBeCloseTo(glmMat[0], FLOAT_PRECISION)
    expect(el[1]).toBeCloseTo(glmMat[1], FLOAT_PRECISION)
    expect(el[2]).toBeCloseTo(glmMat[2], FLOAT_PRECISION)
    expect(el[3]).toBeCloseTo(glmMat[3], FLOAT_PRECISION)
    expect(el[4]).toBeCloseTo(glmMat[4], FLOAT_PRECISION)
    expect(el[5]).toBeCloseTo(glmMat[5], FLOAT_PRECISION)
    expect(el[6]).toBeCloseTo(glmMat[6], FLOAT_PRECISION)
    expect(el[7]).toBeCloseTo(glmMat[7], FLOAT_PRECISION)
    expect(el[8]).toBeCloseTo(glmMat[8], FLOAT_PRECISION)
    expect(el[9]).toBeCloseTo(glmMat[9], FLOAT_PRECISION)
    expect(el[10]).toBeCloseTo(glmMat[10], FLOAT_PRECISION)
    expect(el[11]).toBeCloseTo(glmMat[11], FLOAT_PRECISION)
    expect(el[12]).toBeCloseTo(glmMat[12], FLOAT_PRECISION)
    expect(el[13]).toBeCloseTo(glmMat[13], FLOAT_PRECISION)
    expect(el[14]).toBeCloseTo(glmMat[14], FLOAT_PRECISION)
    expect(el[15]).toBeCloseTo(glmMat[15], FLOAT_PRECISION)
  },
  quat: (glmQuat, threeQuat) => {
    if(threeQuat.toArray) threeQuat = threeQuat.toArray()
    expect(threeQuat[0]).toBeCloseTo(glmQuat[0], FLOAT_PRECISION)
    expect(threeQuat[1]).toBeCloseTo(glmQuat[1], FLOAT_PRECISION)
    expect(threeQuat[2]).toBeCloseTo(glmQuat[2], FLOAT_PRECISION)
    expect(threeQuat[3]).toBeCloseTo(glmQuat[3], FLOAT_PRECISION)
  }
}