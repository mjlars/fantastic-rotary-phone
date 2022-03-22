use employeeDB; 

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Research');

INSERT INTO role
    (jobTitle, salary, department_id)
VALUES
    ('Manager', 100000, 1),
    ('Assistant', 80000, 2),
    ('Employee', 50000, 2),
    ('Intern', 10000, 3),
    ('POS', 1, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES  
    ('Dwight', 'Schrute', 1, NULL),
    ('Jim', 'Halpert', 2, 1),
    ('Pam', 'Beasly', 3, 1),
    ('Stanley', 'Hudson', 5, 3),
    ('Lizard', 'King', 5, 1),
    ('Disney', 'Plus', 5, 5);