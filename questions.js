const questions = [
  {
    type: 'list',
    message: 'Choose a license for this project.',
    name: 'license',
    choices: ['MIT', 'ISC', 'Apache', 'GNU', 'None']
  },
  {
    type: 'input',
    message: 'What is title of the project?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'Enter the description of your project!',
    name: 'description',
  },
  {
    type: 'input',
    message: 'What are the installation instructions?',
    name: 'installation',
  },
  {
    type: 'input',
    message: 'Define how to use the application.',
    name: 'usage',
  },
  {
    type: 'input',
    message: 'Please provide contributing instructions for this project.',
    name: 'contribution',
  },
  {
    type: 'input',
    message: 'What are the testing instructions?',
    name: 'testing',
  },
  {
    type: 'input',
    message: 'What is your Github username?',
    name: 'github',
  },
  {
    type: 'input',
    message: 'What is your email address?',
    name: 'email',
  },
];

module.exports = questions;