const log = console.log;
const inquirer = require('inquirer');
const questions = require('./questions.js');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const addDepartment = async () => {
  const dept = await inquirer.prompt(questions.department);
  const addDeptQuery = 'INSERT INTO department (name) VALUES (?)';
  connection.query(addDeptQuery, dept.name, (err, res) => {
    if (err) throw (err);
    console.log(`The department name '${dept.name}' has been added.`);
  });
  main();
}

const addManager = async () => {
  const manager = await inquirer.prompt(questions.manager);
  const addManagerQuery = 'INSERT INTO manager (first_name, last_name) VALUES (?, ?)';
  // console.log(manager);
  connection.query(addManagerQuery, [manager.firstName, manager.lastName], (err, res) => {
    if (err) throw (err);
    console.log(`The manager '${manager.firstName} ${manager.lastName}' has been added.`);
  });
  main();
}

const addRole = async (dept) => {
  // log('function to add role to database');
  const role = await inquirer.prompt(questions.role);
  const salary = parseFloat(role.salary).toFixed(2);
  // log(role.title, salary, dept, '\n');
  const addRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  connection.query(addRoleQuery, [role.title, salary, dept], (err, res) => {
    if (err) throw (err);
    console.log(`The role of '${role.title}' has been added. \n`);
  });
  main();
}

const addEmployee = async (roleID) => {
  console.log('this is adding an employee \n');
  log('the role id is: ', roleID);
  const employee = await inquirer.prompt(questions.employee);
  log(employee, '\n\n');
  // log(role.title, salary, dept, '\n');
  // const addEmployeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  // connection.query(addRoleQuery, [role.title, salary, dept], (err, res) => {
  //   if (err) throw (err);
  //   console.log(`The employee '${role.title}' has been added. \n`);
  // });
  main();
};

const getDeptList = () => {
  // console.log('get department list called');
  const getDeptQuery = 'SELECT * FROM department';
  connection.query(getDeptQuery, (err, res) => {
    if (err) throw (err);
    let deptList = [];
    deptList.push(res);
    getDeptID(deptList);
    connection.end();
  });
}

const getDeptID = async (arr) => {
  // log('get dept id function ran');
  // console.log(arr[0], '\n\n');
  const deptArray = arr[0];
  // console.log(deptArray, '\n\n');
  let choice = []; 
  deptArray.forEach(e => {
    choice.push(e.name);
  });
  // log(choice);
  const deptID = await inquirer.prompt({
    type: 'list',
    name: 'deptName',
    message: 'What department does this role belong to?',
    choices: choice
  })
  .then((answer) => {
    // log(answer.deptName);
    // log(deptArray);
    deptArray.forEach(e =>{
      if (e.name === answer.deptName){
        // log(e.id);
        addRole(e.id);
        return;
      };
    })
  });
}

const getRoleList = () => {
  // console.log('get department list called');
  const getDeptQuery = 'SELECT * FROM role';
  connection.query(getDeptQuery, (err, res) => {
    if (err) throw (err);
    let roleList = [];
    roleList.push(res);
    // log(roleList);
    getRoleID(roleList);
    connection.end();
  });
}

const getRoleID = async (arr) => {
  // console.log(arr[0], '\n\n');
  const roleArray = arr[0];
  let roleChoice = []; 
  roleArray.forEach(e => {
    roleChoice.push(e.title);
  });
  // log(roleChoice);
  const roleID = await inquirer.prompt({
    type: 'list',
    name: 'roleName',
    message: 'What role does this employee have?',
    choices: roleChoice
  })
  .then((answer) => {
    // log(answer.roleName);
    // log(roleArray);
    roleArray.forEach(e =>{
      if (e.title === answer.roleName){
        // log(e.id);
        addEmployee(e.id);
        return;
      };
    })
  });
}

const welcome = async () => {
  const { action } = await inquirer.prompt(questions.welcome);
  main();
};

const viewTable = (tblName) => {
  const viewQuery = `SELECT * FROM ${tblName}`;
  connection.query(viewQuery, (err, res) => {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    console.log('\n\n');
    })
    main();
  };

const main = async () => {
  const { action } = await inquirer.prompt(questions.action);
  switch(action){
    case 'ADD DEPARTMENT': 
      addDepartment();
      break;
    case 'ADD MANAGER': 
      addManager();
      break;
    case 'ADD ROLE': 
      getDeptList();
      break;
    case 'ADD EMPLOYEE': 
      // addEmployee();
      getRoleList();
      break;
    case 'VIEW DEPARTMENT': 
      viewTable('department');
      break;
    case 'VIEW ROLE': 
      viewTable('role');
      break;
    case 'VIEW EMPLOYEE': 
      viewTable('employee');
      break;
    case 'VIEW MANAGER': 
      viewTable('manager');
      break;
    case 'EXIT THE PROGRAM':
      console.log('Your program has been terminated!');
      connection.end();
      return;
    default:
      console.log('Please select a valid action to perform!')
      main();
      break;
  }
};

connection.connect((err) => {
  if (err) throw (err);
  console.log(`Connected on ${connection.threadId}`);
  welcome();
});