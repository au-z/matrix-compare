module.exports = {
  vec3: (data, label = '') => {
    let msg = label + '  ['
    msg += (data.x) ? (data.x + ',' + data.y + ',' + data.z) : data
    msg += ']'
    console.log(msg)
  }
}