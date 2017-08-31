module.exports = function(mat4) {
  /**
   * Extracts the rotation from the mat4 and applies it to the output matrix
   * @param {mat4} out the matrix to return
   * @param {mat4} mat the matrix to extract a rotation from
   * @return {mat4} out
   */
  mat4.extractRotation = (out, mat) => {
    var sX = 1 / Math.sqrt(mat[0] * mat[0] + mat[1] * mat[1] + mat[2] * mat[2])
    var sY = 1 / Math.sqrt(mat[4] * mat[4] + mat[5] * mat[5] + mat[6] * mat[6])
    var sZ = 1 / Math.sqrt(mat[8] * mat[8] + mat[9] * mat[9] + mat[10] * mat[10])

    out[0] = mat[0] * sX
    out[1] = mat[1] * sX
    out[2] = mat[2] * sX

    out[4] = mat[4] * sY
    out[5] = mat[5] * sY
    out[6] = mat[6] * sY
    
    out[8] = mat[8] * sZ
    out[9] = mat[9] * sZ
    out[10] = mat[10] * sZ
    
    out[3] = mat[3] || 0.0
    out[7] = mat[7] || 0.0
    out[11] = mat[11] || 0.0
    out[12] = mat[12] || 0.0
    out[13] = mat[13] || 0.0
    out[14] = mat[14] || 0.0
    out[15] = mat[15] || 0.0

    return out
  }

  /**
   * Returns a quaternion representing the rotation of the scalar independent matrix
   * @param {quat} out the quaternion representing the rotation
   * @param {mat4} mat the matrix from which to extract a rotation
   * @return {quat} out
   */
  mat4.getScaledRotation = (out, mat) => {
    const temp = mat4.extractRotation([], mat)
    return mat4.getRotation(out, temp)
  }
}