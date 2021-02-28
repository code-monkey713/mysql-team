USE mysqlteam_db;

INSERT INTO department (name)
VALUES ('Human Resources'), ('Engineering'), ('Customer Service'), ('Finance'), ('Fleet Management');

INSERT INTO manager (last_name, first_name)
VALUES ('Chiliberti', 'Rosemary'), ('Smith', 'Kari'), ('Brumskill', 'Sandra'), ('Alexander', 'Khadejah'), ('Hill', 'Sean');

INSERT INTO role (title, salary, department_id)
VALUES ('Web Developer', 73532.85, 1), 
  ('Water Engineering Manager', 126111.13, 2), 
  ('Water Customer Care Representative', 42287.46, 3), 
  ('Title Registration Manager', 61086.06, 4), 
  ('Technical Business Analyst', 60934.23, 5), 
  ('Programmer Analyst 3', 70396.22, 3), 
  ('Fiscal Analyst 3', 93752.80, 1);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES ('Thomas', 'Velma', 6, 4), 
('Dugan', 'Kathy', 5, 4), 
('Lowes', 'Jennifer', 6, 3), 
('Wilds', 'Delicsha', 4, 1), 
('Divon', 'Peter', 5, 3), 
('Mitchell', 'Stephanie', 4, 5), 
('Price', 'Letitia', 2, 1), 
('Ponterio', 'Ann', 4, 2), 
('Page', 'Carlton', 1, 2), 
('Smith', 'Erin', 3, 5); 