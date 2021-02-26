const fs = require('fs');
const inquirer = require('inquirer');
const questions = require('./questions.js');
// const buildREADMEmd = require('./template.js');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// async function main() {
  
  // try {
  //   const userData = await inquirer.prompt(questions);
  //   let color;
  //   switch(userData.license){
  //     case 'MIT':
  //     case 'ISC':
  //       color = 'green'
  //       break;
  //     case 'Apache':
  //     case 'GNU':
  //       color = 'blue';
  //       break;
  //     default:
  //       color = 'lightgrey';
  //       break;
  //   }
  //   // const readme = buildREADMEmd(userData, color);
  //   // fs.writeFileSync('./generated-README.md', readme);
  //   // console.log('File was successfully written.');
  // } catch (error) {
  //   console.log(error);
  // }
// }

// main();

const main = async () => {
  
  const { action } = await inquirer.prompt(questions);
  console.log(action);
  // if (action === 'Exit') return;

  // if (action === 'Place a bid') placeABid();
  // else if (action === 'Post a bid') postABid();
};

connection.connect((err) => {
  if (err) throw (err);
  console.log(`Connected on ${connection.threadId}`);
  main();
});