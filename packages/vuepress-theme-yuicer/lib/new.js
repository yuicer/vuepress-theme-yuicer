const fs = require('fs')
const path = require('path')
const moment = require('moment')

module.exports = async ({ targetDir, title, tpl = '' }) => {
  const defaultContent = `---
  title: ${title}
  date: ${moment().format('YYYY-MM-DD hh:mm:ss')}
  ---
  
  <!-- more -->
  `

  try {
    fs.writeFileSync(
      `${path.join(targetDir)}/${title}.md`,
      tpl
        ? `---
${tpl}
---`
        : defaultContent
    )
  } catch (e) {
    console.error(e)
  }
}
