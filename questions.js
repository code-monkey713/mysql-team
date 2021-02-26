const actions = [
  'ADD DEPARTMENT', 
  'ADD ROLE', 
  'ADD EMPLOYEE', 
  'VIEW DEPARTMENTS', 
  'VIEW ROLES', 
  'VIEW EMPLOYEES', 
  'UPDATE EMPLOYEE ROLE',
  'UPDATE EMPLOYEE MANAGER',
  'VIEW EMPLOYEES BY MANAGER',
  'DELETE DEPARTMENT',
  'DELETE ROLE',
  'DELETE EMPLOYEE',
  'VIEW HR BUDGET OF DEPARTMENT',
  'EXIT THE PROGRAM',
];

const action = [
  {
    type:'list',
    message: 'What action would you like to do?',
    choices: actions,
    name: 'action',
  }
];

const welcome = [
  {
    type: 'input',
    message: `
    WELCOME TO MYSQLTEAM

    Press [Enter] key to continue
    `,
    name: 'title',
  },
];

exports.action = action;
exports.welcome = welcome;
