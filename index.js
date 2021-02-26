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
  // const { action } = await inquirer.prompt(questions.welcome);
  console.log('this is adding a department');
  main();
};

const addRole = async () => {
  // const { action } = await inquirer.prompt(questions.welcome);
  console.log('this is adding a role');
  main();
};

const addEmployee = async () => {
  // const { action } = await inquirer.prompt(questions.welcome);
  console.log('this is adding an employee');
  main();
};

const welcome = async () => {
  const { action } = await inquirer.prompt(questions.welcome);
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
    case 'EXIT THE PROGRAM':
      console.log('Your program has been terminated!');
      return;
    default:
      console.log('Please select an action to perform!')
      break;
  }
};

connection.connect((err) => {
  if (err) throw (err);
  console.log(`Connected on ${connection.threadId}`);
  welcome();
});