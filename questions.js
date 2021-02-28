const actions = [
  // 'ADD DEPARTMENT', 
  'ADD ROLE', 
  // 'ADD EMPLOYEE', 
  // 'ADD MANAGER', 
  // 'VIEW DEPARTMENT', 
  'VIEW ROLE', 
  // 'VIEW EMPLOYEE', 
  // 'VIEW MANAGER',
  // 'UPDATE EMPLOYEE ROLE',
  // 'UPDATE EMPLOYEE MANAGER',
  // 'VIEW EMPLOYEES BY MANAGER',
  // 'VIEW HR BUDGET OF DEPARTMENT',
  // 'DELETE DEPARTMENT',
  // 'DELETE ROLE',
  // 'DELETE EMPLOYEE',
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
    name: 'welcome',
  },
];

const department = [
  {
    type: 'input',
    message: 'What is the name of the department you want to add?',
    name: 'name',
  }
]

exports.action = action;
exports.welcome = welcome;
exports.department = department;
