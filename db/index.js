const connection = require('./connection.js');

class Database {
    constructor(connection) {
        this.connection = (connection)
    }

    viewDepartments() {
        return this.connection.promise().query( 
            `SELECT 
                department.id, 
                department.name
            FROM
                department`
        )
    };

    viewRoles() {
        return this.connection.promise().query( 
            `SELECT 
                role.id, 
                role.jobTitle,
                role.salary,
                department.name AS department
            FROM
                role
            LEFT JOIN 
                department ON role.department_id = department.id`
        )
    };

    viewEmployees() {
        return this.connection.promise().query( 
            `SELECT 
                employee.id,
                employee.first_name,
                employee.last_name, 
                role.jobTitle AS role,
                employee.manager_id
            FROM
                employee
            LEFT JOIN 
                role ON employee.role_id = role.id`
        )
    };

    addDepartment(department) {
        return this.connection.promise().query(
            `INSERT INTO 
                department
            SET 
                ?`, department
        )
    };

    addRole(role) {
        return this.connection.promise().query(
            `INSERT INTO 
                role 
            SET 
                ?`, role
        )
    };

    addEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO 
                employee 
            SET 
                ?`, employee
        )
    };

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            `UPDATE
                employee 
            SET 
                role_id = ? 
            WHERE 
                id = ?`, [roleId, employeeId]
        )
    }

};

module.exports = new Database(connection);