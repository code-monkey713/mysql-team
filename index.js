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
  connection.query(addManagerQuery, [manager.firstName, manager.lastName], (err, res) => {
    if (err) throw (err);
    console.log(`The manager '${manager.firstName} ${manager.lastName}' has been added.`);
  });
  main();
}

const addRole = async (dept) => {
  const role = await inquirer.prompt(questions.role);
  const salary = parseFloat(role.salary).toFixed(2);
  const addRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
  connection.query(addRoleQuery, [role.title, salary, dept], (err, res) => {
    if (err) throw (err);
    console.log(`The role of '${role.title}' has been added. \n`);
    
  });
  main();
}

const addEmployee = async (roleID, managerID) => {  
  const employee = await inquirer.prompt(questions.employee);
  const addEmployeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  connection.query(addEmployeeQuery, [employee.firstName, employee.lastName, roleID, managerID], (err, res) => {
    if (err) throw (err);
    log(`The employee '${employee.lastName}, ${employee.firstName}' has been added. \n`);
    main();
  });
}

const updateRole = (roleID, employeeID) => {
  // log(`role ID: ${parseInt(roleID)} || employee ID ${parseInt(employeeID)} \n`);
  const updateEmployeeRole = `
    UPDATE employee
    SET role_id = ${parseInt(roleID)}
    WHERE id = ${parseInt(employeeID)};`;
  connection.query(updateEmployeeRole, [parseInt(roleID), parseInt(employeeID)], (err, res) => {
    if (err) throw (err);
    log(`Employee ${employeeID} role has been updated to ${roleID} \n`);main();
  });
}

const hasManager = (roleID) => {
  log('the role id is: ', roleID);
  inquirer.prompt({
    type: 'confirm',
    name: 'hasManager',
    message: 'Does this employee have a manager to report to?'
  })
  .then((answer) => {
    if (answer.hasManager === true) {
      log(answer);
      getManagerList(roleID);
      return;
    } else {
      addEmployee(roleID, 1);
    }
  });
};

const getManagerList = async (role) => {
  const getManagerQuery = 'SELECT * FROM manager';
  connection.query(getManagerQuery, (err, res) => {
    if (err) throw (err);
    getManagerID(res, role);
  })
}

const getManagerID = async (arr, role) => {
  const managerArray = arr;
  let managerChoice = [];
  managerArray.forEach(e => {
    managerChoice.push(e.id + ' - ' + e.last_name + ', ' + e.first_name);
  });
  const managerID = await inquirer.prompt({
    type: 'list',
    name: 'managerName',
    message: 'Who is the manager for this employee?',
    choices: managerChoice, 
  })
  .then((answer) => {
    addEmployee(role, parseInt(answer.managerName));
  });
}

const getDeptList = () => {
  const getDeptQuery = 'SELECT * FROM department';
  connection.query(getDeptQuery, (err, res) => {
    if (err) throw (err);
    let deptList = [];
    deptList.push(res);
    getDeptID(deptList);
  });
}

const getDeptID = async (arr) => {
  const deptArray = arr[0];
  let choice = []; 
  deptArray.forEach(e => {
    choice.push(e.name);
  });
  const deptID = await inquirer.prompt({
    type: 'list',
    name: 'deptName',
    message: 'What department does this role belong to?',
    choices: choice
  })
  .then((answer) => {
    deptArray.forEach(e =>{
      if (e.name === answer.deptName){
        addRole(e.id);
        return;
      };
    })
  });
}

const getRoleList = (use) => {
  const getDeptQuery = 'SELECT * FROM role';
  connection.query(getDeptQuery, (err, res) => {
    if (err) throw (err);
    let roleList = [];
    roleList.push(res);
    const action = (use === 'add') ? getRoleID(roleList) : null;
  });
}

const getRoleID = async (arr) => {
  const roleArray = arr[0];
  let roleChoice = []; 
  roleArray.forEach(e => {
    roleChoice.push(e.title);
  });
  const roleID = await inquirer.prompt({
    type: 'list',
    name: 'roleName',
    message: 'What role will this employee have?',
    choices: roleChoice
  })
  .then((answer) => {
    roleArray.forEach(e =>{
      if (e.title === answer.roleName){
        hasManager(e.id);
        return;
      };
    })
  });
}

const getRoleListUpdate = (eID) => {
  log('the employee data ', eID, '\n');
  const updateRoleQuery = 'SELECT * FROM role';
  connection.query(updateRoleQuery, (err, res) => {
    if (err) throw (err);
    let updateRoleList = [];
    updateRoleList.push(res);
    getRoleIDupdate(updateRoleList, eID);
  });
}

const getRoleIDupdate = async (arr, eID) => {
  const roleArray = arr[0];
  let roleChoiceUpdate = []; 
  roleArray.forEach(e => {
    roleChoiceUpdate.push(`${e.id} - ${e.title}`);
  });
  log(roleChoiceUpdate, '\n');
  const roleIDupdate = await inquirer.prompt({
    type: 'list',
    name: 'roleName',
    message: 'What role will this employee have?',
    choices: roleChoiceUpdate
  })
  .then((res) => {
    // log('roleID: ', res.roleName, 'employee ID: ', eID);
    updateRole(res.roleName, eID);
  });
}

const getEmployeeID = async (arr) => {
  const employeeArray = arr[0];
  let employeeChoice = [];
  log(employeeArray, '\n');
  employeeArray.forEach(e => {
    employeeChoice.push(e.id + ' - ' + e.last_name + ', ' + e.first_name);
  });
  log(employeeChoice, '\n');
  const employeeID = await inquirer.prompt({
    type: 'list',
    name: 'employeeName',
    message: 'Which employee you wish to change the role for?',
    choices: employeeChoice, 
  })
  .then((res) => {
    log('the response is: ', res, '\n')
    // addEmployee(role, parseInt(answer.managerName));
    // log('function to call what roles list to change to');
    getRoleListUpdate(res.employeeName);
    });
  // });
}

const getEmployeeList = () => {
  const getEmployeeQuery = 'SELECT * FROM employee';
  connection.query(getEmployeeQuery, (err, res) => {
    if (err) throw (err);
    let employeeList = [];
    employeeList.push(res);
    // log(employeeList, '\n');
    getEmployeeID(employeeList);
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
    console.log('\n');
    main();
    })
    
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
      getRoleList('add');
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
    case 'UPDATE EMPLOYEE ROLE': 
      getEmployeeList();
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