const fs = require('fs');
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
    console.log(`Your department of ${dept.name} has been added.`);
  });
  main();
};

const addRole = async () => {
  console.log('this is adding a role');
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
    console.log('');
    console.table(res);
    console.log('');
    })
    main();
  };

const main = async () => {
  const { action } = await inquirer.prompt(questions.action);
  switch(action){
    case 'ADD DEPARTMENT': 
      addDepartment();
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
      break;
  }
};

connection.connect((err) => {
  if (err) throw (err);
  console.log(`Connected on ${connection.threadId}`);
  welcome();
});