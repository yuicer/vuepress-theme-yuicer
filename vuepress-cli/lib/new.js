const fs = require('fs')

module.exports = async options => {
  try {
    fs.writeFileSync('./a.md', JSON.stringify(options, null, 2))
  } catch (e) {
    error(
      `Error saving preferences: ` +
        `make sure you have write access to ${rcPath}.\n` +
        `(${e.message})`
    )
  }
}
