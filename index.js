const fs = require('fs');
const inquirer = require('inquirer');
const questions = require('./questions.js');
const buildREADMEmd = require('./template.js');

async function main() {
  try {
    const userData = await inquirer.prompt(questions);
    let color;
    switch(userData.license){
      case 'MIT':
      case 'ISC':
        color = 'green'
        break;
      case 'Apache':
      case 'GNU':
        color = 'blue';
        break;
      default:
        color = 'lightgrey';
        break;
    }
    const readme = buildREADMEmd(userData, color);
    fs.writeFileSync('./generated-README.md', readme);
    console.log('File was successfully written.');
  } catch (error) {
    console.log(error);
  }
}

main();