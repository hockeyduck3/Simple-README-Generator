const fs = require("fs")
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js")

const questions = [
    {
        type: 'input',
        message: 'What is name of your project?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Make a short description for your project',
        name: 'description'
    },
    {
        type: 'input',
        message: 'What would you like in your table of contents?',
        name: 'table'
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
        console.log(answers);

        writeToFile(`${answers.title}-README.md`, answers);
    });
}

init();
