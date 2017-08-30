const three = require('three')
const glm = require('gl-matrix')
const print = require('./helpers/print')
const equal = require('./helpers/equal')

const Matrix4 = three.Matrix4
const Vector3 = three.Vector3
const Quaternion = three.Quaternion

const mat4 = glm.mat4
const vec3 = glm.vec3
const quat = glm.quat

function glmGetRotation(out, m) {
  /*
    Rotation from inscribed 3x3 matrix
    ________________
    | 1.0, 0.0, 0.0,| 0.0
    | 0.0, 1.0, 0.0,| 0.0
    | 0.0, 0.0, 1.0,| 0.0
    _________________
      0.0, 0.0, 0.0, 1.0
  */

  /*
    _______________
    |  m0, m1, m2, | m3
    |  m4, m5, m6, | m7
    |  m8, m9, m10,| m11
    _______________
     m12, m13, m14, m15 
  */

  let trace = m[0] + m[5] + m[10]
  let S = 0

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2
    out[3] = 0.25 * S
    out[0] = (m[6] - m[9]) / S
    out[1] = (m[8] - m[2]) / S
    out[2] = (m[1] - m[4]) / S

  } else if ((m[0] > m[5])&(m[0] > m[10])) {
    S = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 2
    out[3] = (m[6] - m[9]) / S
    out[0] = 0.25 * S
    out[1] = (m[1] + m[4]) / S
    out[2] = (m[8] + m[2]) / S

  } else if (m[5] > m[10]) {
    S = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 2
    out[3] = (m[8] - m[2]) / S
    out[0] = (m[1] + m[4]) / S
    out[1] = 0.25 * S
    out[2] = (m[6] + m[9]) / S

  } else {
    S = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 2
    out[3] = (m[1] - m[4]) / S
    out[0] = (m[8] + m[2]) / S
    out[1] = (m[6] + m[9]) / S
    out[2] = 0.25 * S
  }

  return out
}

function threeGetRotation(out, m) {
  let trace = m[0] + m[5] + m[10]
  let S = 0

  if (trace > 0) {
    S = 0.5 / Math.sqrt(trace + 1.0);
    out[3] = 0.25 / S;
    out[0] = (m[6] - m[9]) * S;
    out[1] = (m[8] - m[2]) * S;
    out[2] = (m[1] - m[4]) * S;

  } else if ((m[0] > m[5])&&(m[0] > m[10])) {
    S = 2.0 * Math.sqrt(1.0 + m[0] - m[5] - m[10]);
    out[3] = (m[6] - m[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (m[4] + m[1]) / S;
    out[2] = (m[8] + m[2]) / S;

  } else if (m[5] > m[10]) {
    S = 2.0 * Math.sqrt(1.0 + m[5] - m[0] - m[10]);
    out[3] = (m[8] - m[2]) / S;
    out[0] = (m[4] + m[1]) / S;
    out[1] = 0.25 * S;
    out[2] = (m[9] + m[6]) / S;

  } else {
    S = 2.0 * Math.sqrt(1.0 + m[10] - m[0] - m[5]);
    out[3] = (m[1] - m[4]) / S;
    out[0] = (m[8] + m[2]) / S;
    out[1] = (m[9] + m[6]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}

describe('sandbox tests', () => {
  it('rotation algorithms yield the same quaternion', () => {
    let values = [
      1.0, 1.0, 1.0, 0.0,
      1.0, 1.0, 1.0, 0.0,
      1.0, 1.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]
    let mat = mat4.fromValues(...values)
    let glmRotation = quat.create()
    let threeRotation = quat.create()
    glmGetRotation(glmRotation, mat)
    threeGetRotation(threeRotation, mat)
    print.quat(glmRotation, 'rotation')
    equal.quat(glmRotation, threeRotation)
  })
})