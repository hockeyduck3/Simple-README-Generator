function generateMarkdown(data) {
  let string = `# ${data.title}\n`

  string += `\n## Description\n\n${data.description}\n`;

  if (data.table) {
    // I chose to have these seperate instead of in one string just for readability

    let tableString = '\n## Table of contents\n';

    tableString += '\n* [Installation](#installation)\n';
    tableString += '\n* [Usage](#usage)\n';

    if (data.contributeTrueOrFalse) {
      tableString += '\n* [Contributing](#contributing)\n';
    }

    tableString += '\n* [License](#license)\n'

    string += tableString;
  }

  // Same goes for these down here. I chose to keep these seperate just so they'd be easier to read.
  
  string += `\n## Installation\n\n${data.install}\n\n`;
  string += `\n## Usage\n\n${data.usage}\n\n`;

  if (data.contributeTrueOrFalse) {
    string += '\n## Contributing\n';

    for (let i = 0; i < data.contributeSteps; i++) {
      string += `\n### Step ${i + 1}\n\n* ${data[`step${i + 1}`]}\n`
    }
  }

  if (data.name === undefined) {
    string += `\n\n## License\n\nCopyright (c) ${data.githubName} All rights reserved.\n`;
  } else {
    string += `\n\n## License\n\nCopyright (c) ${data.name} All rights reserved.\n`;
  }


  if (data.license !== 'No license') {
    string += `\nLicensed under the ${data.license} license.`
  }

  return string;
}

module.exports = generateMarkdown;
