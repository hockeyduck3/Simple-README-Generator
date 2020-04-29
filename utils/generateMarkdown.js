function generateMarkdown(data) {
  let title = data.githubRepo.replace(/-/g, " ")

  let string = `# ${title}\n\n[![repo size](https://img.shields.io/github/repo-size/${data.githubName}/${data.githubRepo})](https://github.com/${data.githubName}/${data.githubRepo})\n`;
  
  string += `\n## Description\n\n${data.description}\n`;


  if (data.table) {
    // I chose to have these seperate instead of in one string just for readability

    let tableString = '\n## Table of contents\n';

    tableString += '\n* [Installation](#installation)\n';
    tableString += '\n* [Usage](#usage)\n';

    if (data.contributeTrueOrFalse) {
      tableString += '\n* [Contributing](#contributing)\n';
    }

    if (data.testsTrueorFalse) {
      tableString += '\n* [Tests](#tests)\n';
    }

    tableString += '\n* [Questions](#questions)\n'
    tableString += '\n* [License](#license)\n'

    string += tableString;
  }

  // Same goes for these down here. I chose to keep these seperate just so they'd be easier to read.
  
  string += `\n## Installation\n\n>To install the needed dependencies, run this command:\n\n\`\`\`\n${data.install}\n\`\`\`\n`;
  string += `\n## Usage\n\n${data.usage}\n`;

  if (data.contributeTrueOrFalse) {
    string += '\n## Contributing\n';
    
    for (let i = 0; i < data.contributeSteps; i++) {
      string += `\n### Step ${i + 1}\n* ${data[`step${i + 1}`]}\n`
    }
  }

  if (data.testsTrueorFalse) {
    string += `\n## Tests\n\n>To run tests, run this command:\n\n\`\`\`\n${data.testsContent}\n\`\`\`\n`;
  }

  let githubLink = `https://github.com/${data.githubName}`;

  if (data.name === undefined) {
    string += `\n## Questions\n\nIf you have any questions, please open an issue or contact [${data.githubName}](${githubLink}).\n`;
    string += `\n## License\nCopyright (c) ${data.githubName} All rights reserved.\n`;
  } else {
    string += `\n## Questions\n\nIf you have any questions, please open an issue or contact [${data.name}](${githubLink}).\n`;
    string += `\n## License\nCopyright (c) ${data.name} All rights reserved.\n`;
  }

  if (data.license !== 'No license') {
    string += `\nLicensed under the ${data.license} license.`
  }

  return string;
}

module.exports = generateMarkdown;
