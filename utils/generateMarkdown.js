function generateMarkdown(data) {
  let string = `# ${data.title}\n`

  string += `\n## Description\n\n${data.description}\n`;

  if (data.table) {
    // I chose to have these seperate instead of in one string just for readability

    let tableString = '\n## Table of contents\n';

    tableString += '\n* [Installation](#installation)\n';
    tableString += '\n* [Usage](#usage)\n';

    if (data.creditTrueOrFalse) {
      tableString += '\n* [Credits](#credits)\n';
    }

    tableString += '\n* [License](#license)\n'

    string += tableString;
  }

  // Same goes for these down here. I chose to keep these seperate just so they'd be easier to read.
  
  string += `\n## Installation\n\n${data.install}\n\n`;
  string += `\n## Usage\n\n${data.usage}\n\n`;

  if (data.creditTrueOrFalse) {
    string += `\n## Credits\n\n${data.creditor}\n\n`;
  }

  string += `\n## License\n\nCopyright (c) ${data.githubName} All rights reserved.\n\n`;

  if (data.license !== 'No license') {
    string += `\nLicensed under the ${data.license} license.`
  }

  return string;
}

module.exports = generateMarkdown;
