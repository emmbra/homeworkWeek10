// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.title = "Employee";
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getId() {
        return this.id;
    }
    getRole() {
        return this.title;
    }
}

module.exports = Employee;