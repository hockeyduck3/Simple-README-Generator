const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

const titleValidation = async (input) => {
    if (input === '') {
       return 'Field cannot be left blank';
    }

    return true;
}

const questions = [
    {
        type: 'input',
        message: 'What is your github name?',
        name: 'githubName',
        validate: titleValidation
    },
    {
        type: 'input',
        message: 'What is name of your project?',
        name: 'title',
        validate: titleValidation
    },
    {
        type: 'input',
        message: 'Make a short description for your project',
        name: 'description',
        validate: titleValidation
    },
    {
        type: 'confirm',
        message: 'Would like a table of contents?',
        name: 'table',
    },
    {
        type: 'input',
        message: 'How does a user install your project?',
        name: 'install'
    },
    {
        type: 'input',
        message: 'How is your project supposed to be used?',
        name: 'usage'
    },
    {
        type: 'confirm',
        message: 'Would you like a list on how to contribute?',
        name: 'contributeTrueOrFalse'
    }, {
        when: function (response) {
          return response.contributeTrueOrFalse;
        },
        type: 'input',
        message: 'How many steps would you like to list?',
        name: 'contributeSteps'
    },
    {
        type: 'list',
        message: 'Finally, what type of license would you like to use?',
        name: 'license',
        choices: ['MIT', 'GNU', 'No license']
    }
];

function writeToFile(fileName, data) {
    let generated = generateMarkdown(data);

    fs.writeFile(fileName, generated, () => {
        console.log(`${fileName} has been generated!`)
    })
}

function init() {
    inquirer.prompt(questions).then(function (answers) {
        var number = 0

        answers.contributeSteps = parseInt(answers.contributeSteps);

        if (answers.contributeTrueOrFalse) {
            contributeFunc();

            function contributeFunc() {
                number++
                
                inquirer.prompt([
                    {
                        type: 'input',
                        message: `What would you like step ${number} to say?`,
                        name: `step${number}`,
                        validate: titleValidation
                    }
                ]).then((contributeRes) => {
                    answers[`step${number}`] = contributeRes[`step${number}`];

                    if (number === answers.contributeSteps) {
                        runAxios();
                    } else {
                        contributeFunc();
                    }
                })
            }
            
            function runAxios() {
                const queryUrl = `https://api.github.com/users/${answers.githubName}`
            
                axios.get(queryUrl).then(function (response) {
                    answers.name = response.data.name;
            
                    writeToFile(`${answers.title}-README.md`, answers);
                }).catch(function () {
                    writeToFile(`${answers.title}-README.md`, answers);
                })
            }
        }
    });
}

init();
