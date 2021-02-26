const actions = [
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
];

module.exports = actions;