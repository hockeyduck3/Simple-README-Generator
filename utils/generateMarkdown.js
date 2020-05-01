function generateMarkdown(data) {
  // I chose to do string += everything just for readability. The aplication still functions the same as it would if it was done a differrent way. 

  // This variable will always be true, unless the user chose 'No license', then after the switch statement runs this variable will be equal to false.
  var license = true;

  // By default the README will use the user's github name unless they choose to have their real name instead
  var name = data.githubName;

  let string = `# ${data.githubRepo.replace(/-/g, " ")}\n`;

  // Repo badge
  string += `\n[![repo size](https://img.shields.io/github/repo-size/${data.githubName}/${data.githubRepo})](https://github.com/${data.githubName}/${data.githubRepo})`;
  
  // Switch for the licenseLink
  switch (data.license) {
    case 'MIT':
      var licenseLink = 'mit-license.php';
      break;
    case 'GPL 3.0':
      var licenseLink = 'GPL-3.0';
      break;
    case 'APACHE 2.0':
      var licenseLink = 'Apache-2.0';
      break;
    case 'BSD 3':
      var licenseLink = 'BSD-3-Clause';
      break;
    default:
      license = false;
  }

  // As long as the user selected a license, this badge will go right next to the repo badge.
  if (license) {
    string += ` [![Github license](https://img.shields.io/badge/license-${data.license.replace(/\b \b/g, "%20")}-blue.svg)](https://opensource.org/licenses/${licenseLink})`;
  }

  string += `\n\n## Description\n\n${data.description}\n`;


  // If the user wants a table of content
  if (data.table) {
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

  // If the user chose to have their real name on the README instead of their github username
  if (data.realName) {
    // Check and make sure the user actually has their name on their github profile
    if (data.name !== undefined) {
      name = data.name;
    }
  }

  string += `\n## Questions\n\nIf you have any questions, please open an issue or contact [${name}](https://github.com/${data.githubName}).\n`;
  string += `\n## License\nCopyright (c) ${name} All rights reserved.\n`;

  // As long as the user chose a license, this is statement will run.
  if (license) {
    string += `\nLicensed under the [${data.license}](https://opensource.org/licenses/${licenseLink}) license.`
  }

  return string;
}

module.exports = generateMarkdown;
