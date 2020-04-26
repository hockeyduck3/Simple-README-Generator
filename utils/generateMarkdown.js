function generateMarkdown(data) {
  return `
# ${data.title}

## Description

${data.description}


## Table of contents

* ${data.table}

`;
}

module.exports = generateMarkdown;
