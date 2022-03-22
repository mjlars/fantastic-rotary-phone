const database = require('./db');
const inquirer = require('inquirer');
require('console.table');


const Menu = () => {

    inquirer.prompt(
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Done'
            ]
        }
    )

    .then((answer) => {
            switch (answer.menu) {
                case 'View Departments':
                    return viewDepartments();
                case 'View Roles':
                    return viewRoles();
                case 'View Employees':
                    return viewEmployees();
                case 'Add Department':
                    return addDepartment();
                case 'Add Role':
                    return addRole();
                case 'Add Employee':
                    return addEmployee();
                case 'Update Employee Role':
                    return updateEmployeeRole();
                case 'Done':
                    return process.exit();
            }
        });
};

async function viewDepartments() {
    const [department] = await database.viewDepartments();
    console.table(department);
    Menu();
}

async function viewRoles() {
    const [roles] = await database.viewRoles();
    console.table(roles);
    Menu();
}

async function viewEmployees() {
    const [employees] = await database.viewEmployees();
    console.table(employees);
    Menu();
}


async function addDepartment() {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'New Department Name'
        }
    ])
    database.addDepartment(department);
    console.log(`Added ${department} department to the database.`);
    Menu();
};

async function addRole() {
    const [department] = await database.viewDepartments();
    const departmentChoices = department.map(({ id, name }) => ({
        name: name,
        value: id
    }));


    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'jobTitle',
            message: 'Role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'role salary'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Department role is in',
            choices: departmentChoices
        }
    ]);


    await database.addRole(role);
    console.log(`Added ${role.jobTitle} role to the database`);
    Menu();
}

async function addEmployee() {
    const [role] = await database.viewRoles();
    const roleChoices = role.map(({ id, jobTitle }) => ({
        name: jobTitle,
        value: id
    }));
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Employee First Name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Employee Last Name'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Employee Role/Job',
            choices: roleChoices
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'Employees Manager ID'
        }
    ]);
    await database.addEmployee(employee);
    console.log(`Added ${employee.first_name} ${employee.last_name} to the database`);
    Menu();
}

async function updateEmployeeRole() {
    const [employee] = await database.viewEmployees();
    const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));


    const [role] = await database.viewRoles();


    const roleChoices = role.map(({ id, jobTitle }) => ({
        name: jobTitle,
        value: id
    }));

    const { roleId, employeeId} = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Who Needs A Role/Job Change',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Which Role/Job Are They Changing To',
            choices: roleChoices
        }
    ]);
    await database.updateEmployeeRole(employeeId, roleId);
    console.log(`Employee Role/Job Updated`);
    Menu();
};

Menu();