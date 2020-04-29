function generateMarkdown(data) {
  let title = data.githubRepo.replace(/-/g, " ")

  let string = `# ${title}\n\n[![repo size](https://img.shields.io/github/repo-size/${data.githubName}/${data.githubRepo})](https://github.com/${data.githubName}/${data.githubRepo})\n`;
  
  string += `\n## Description\n\n${data.description}\n`;


  // If the user wants a table of content
  if (data.table) {
    // I chose to have these seperate instead of in one string just for readability
    string += '\n## Table of contents\n';

    string += '\n* [Installation](#installation)\n';
    string += '\n* [Usage](#usage)\n';

    if (data.contributeTrueOrFalse) {
      string += '\n* [Contributing](#contributing)\n';
    }

    if (data.testsTrueorFalse) {
      string += '\n* [Tests](#tests)\n';
    }

    string += '\n* [Questions](#questions)\n'
    string += '\n* [License](#license)\n'
  }

  // Same goes for these down here. I chose to keep these seperate just so they'd be easier to read.
  string += `\n## Installation\n\n>To install the needed dependencies, run this command:\n\n\`\`\`\n${data.install}\n\`\`\`\n`;
  string += `\n## Usage\n\n${data.usage}\n`;

  // If the user said yes to having a contribute section
  if (data.contributeTrueOrFalse) {
    string += '\n## Contributing\n';
    
    // If the user only has one step then it will just be a bullet point.
    if (data.contributeSteps === 1) {
      string += `\n* ${data['step1']}`;
    } 
    
    // Otherwise this will loop over and add the different steps
    else {
      for (let i = 0; i < data.contributeSteps; i++) {
        string += `\n### Step ${i + 1}\n* ${data[`step${i + 1}`]}\n`
      }
    }
  }

  // If the user wants a tests section
  if (data.testsTrueorFalse) {
    string += `\n## Tests\n\n>To run tests, run this command:\n\n\`\`\`\n${data.testsContent}\n\`\`\`\n`;
  }

  // Just in case if the user doesn't have their name on their github profile
  if (data.name === undefined) {
    var name = data.githubName;
  } else {
    var name = data.name;
  }

  string += `\n## Questions\n\nIf you have any questions, please open an issue or contact [${name}](https://github.com/${data.githubName}).\n`;
  string += `\n## License\nCopyright (c) ${name} All rights reserved.\n`;

  // If the user chose to have a license
  if (data.license !== 'No license') {
    string += `\nLicensed under the ${data.license} license.`
  }

  return string;
}

module.exports = generateMarkdown;
