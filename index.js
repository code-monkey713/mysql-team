// const fs = require('fs');
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
});

const addDepartment = async () => {
  const dept = await inquirer.prompt(questions.department);
  const addDeptQuery = 'INSERT INTO department (name) VALUES (?)';
  connection.query(addDeptQuery, dept.name, (err, res) => {
    if (err) throw (err);
    console.log(`The department name '${dept.name}' has been added.`);
  });
  main();
};

const addManager = async () => {
  const manager = await inquirer.prompt(questions.manager);
  const addManagerQuery = 'INSERT INTO manager (first_name, last_name) VALUES (?, ?)';
  console.log(manager);
  connection.query(addManagerQuery, [manager.firstName, manager.lastName], (err, res) => {
    if (err) throw (err);
    console.log(`The manager '${manager.firstName} ${manager.lastName}' has been added.`);
  });
  main();
};

const getDeptID = (choice) => {
  // console.log('get dept id function ran');
  // const getDeptQuery = 'SELECT * FROM department';
  // let deptArr = [];
  // connection.query(getDeptQuery, (err, res) => {
  //   deptArr = res.map(m => `
  //   {
  //     key: ${m.id},
  //     name: ${m.name},
  //   },
  //   `).join('');
  //   console.log('\n\n');
  //   console.log(allDeptID);
  //   console.log('\n\n');
    // const deptID = await inquirer.prompt({
    //   type: 'expand',
    //   name: 'departmentID',
    //   message: 'What department does this role belong to?',
    //   choices: deptArr
    // })
    // .then((answer) => {
    //   // const query = 'SELECT position, song, year FROM top5000 WHERE ?';
    //   // connection.query(query, { artist: answer.artist }, (err, res) => {
    //   //   res.forEach(({ position, song, year }) => {
    //   //     console.log(
    //   //       `Position: ${position} || Song: ${song} || Year: ${year}`
    //   //     );
    //   //   });
    //     console.log(answer);
    // });
    // return(deptArr);

    // return('This is the ID');
    // main();
    // });
};

const addRole = async () => {
  console.log('add role function call');
  const getDeptQuery = 'SELECT * FROM department';
  let deptArr = [];
  connection.query(getDeptQuery, (err, res) => {
    deptArr = res.map(m => `
    {
      key: ${m.id},
      name: ${m.name},
    },
    `).join('');
    console.log('\n\n');
    console.log(deptArr);
    console.log('\n\n');
  // const deptChoice = getDeptID();
  // getDeptID();
  // console.log(deptChoice);
  });
    // const role = await inquirer.prompt(questions.role);
    // const salary = parseFloat(role.salary).toFixed(2);
    // console.log(salary);
    // const addRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    // console.log(role);

    // add function here to do a query of all the department and return ID of department user select //

    // connection.query(addRoleQuery, [role.title, salary, departmentID], (err, res) => {
    //   if (err) throw (err);
    //   console.log(`The role of '${role.title}' has been added.`);
    // });
  main();
};

const addEmployee = async () => {
  console.log('this is adding an employee');
  main();
};

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
      addRole();
      break;
    case 'ADD EMPLOYEE': 
      addEmployee();
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