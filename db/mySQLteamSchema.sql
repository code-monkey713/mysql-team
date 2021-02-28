DROP DATABASE IF EXISTS mySQLteam_DB;
CREATE DATABASE mySQLteam_DB;

USE mySQLteam_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(40),
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT, 
  title VARCHAR(50), 
  salary DECIMAL(20, 2), 
  department_id INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(40),
  last_name VARCHAR(40),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES manager(id)
); 