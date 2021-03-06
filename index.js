const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// In case the user tries to leave the field blank
const fieldValidation = async (input) => {
    if (input === '') {
       return 'Field cannot be left blank';
    }

    return true;
}

// In case the user tries to type in something other than a number
const numberValidation = async (input) => {
    if (!input.match(/[0-9]/)) {
        return 'Field must be a number'
    }

    return true;
}

const questions = [
    {
        type: 'input',
        message: 'What is your Github name?',
        name: 'githubName',
        validate: fieldValidation
    },
    {
        type: 'input',
        message: 'What is the name of your Github repo?',
        name: 'githubRepo',
        validate: fieldValidation
    },
    {
        type: 'confirm',
        message: 'Would you like to use your real name on the README?',
        name: 'realName'
    },
    {
        type: 'input',
        message: 'Please make a short description for your project',
        name: 'description',
        validate: fieldValidation
    },
    {
        type: 'confirm',
        message: 'Would like a table of contents?',
        name: 'table',
    },
    {
        type: 'input',
        message: 'What command does the user need to run to install needed dependencies?',
        name: 'install',
        default: 'npm i',
        validate: fieldValidation
    },
    {
        type: 'confirm',
        message: 'Would you like to include a Tests section?',
        name: 'testsTrueorFalse'
    }, {
        when: function (response) {
          return response.testsTrueorFalse;
        },
        type: 'input',
        message: 'What command does the user need to test your program?',
        name: 'testsContent',
        default: 'npm test',
        validate: fieldValidation
    },
    {
        type: 'input',
        message: 'How is your project supposed to be used?',
        name: 'usage',
        validate: fieldValidation
    },
    {
        type: 'list',
        message: 'What type of license would you like to use?',
        name: 'license',
        default: 'Use arrow key to navigate',
        choices: ['MIT', 'GPL 3.0', 'APACHE 2.0', 'BSD 3', 'No license']
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
        name: 'contributeSteps',
        validate: numberValidation
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
        var number = 0;

        // Have to use parseInt here because it saves the user's number answer as a string
        answers.contributeSteps = parseInt(answers.contributeSteps);

        // If the user wants a contribute section
        if (answers.contributeTrueOrFalse) {
            contributeFunc();

            // This function will continue to ask the user what they want step 1,2,3 to say or however many steps they input
            function contributeFunc() {
                number++;
                
                inquirer.prompt([
                    {
                        type: 'input',
                        message: `What would you like Step ${number} to say?`,
                        name: `step${number}`
                    }
                ]).then((contributeRes) => {
                    answers[`step${number}`] = contributeRes[`step${number}`];

                    if (number === answers.contributeSteps) {
                        // This will check and see if the user wants their real name or not
                        if (answers.realName) {
                            runAxios();
                        } else {
                            writeToFile(`${answers.githubRepo}-README.md`, answers);
                        }
                    } else {
                        contributeFunc();
                    }
                })
            }
            
          // If the user chose not to have a contributing section 
        } else {
            // Then check and see if the user wanted their real name or their github name
            if (answers.realName) {
                runAxios();
            } else {
                writeToFile(`${answers.githubRepo}-README.md`, answers);
            }
        }

        // This function will make a quick api call to github and grab the user's name from their github profile and use that instead of their github username
        function runAxios() {
            const queryUrl = `https://api.github.com/users/${answers.githubName}`
        
            axios.get(queryUrl).then(function (response) {
                answers.name = response.data.name;
        
                writeToFile(`${answers.githubRepo}-README.md`, answers);

                // If the api had an error then just go ahead and run the function
            }).catch(function () {
                writeToFile(`${answers.githubRepo}-README.md`, answers);
            })
        }
    });
}

init();