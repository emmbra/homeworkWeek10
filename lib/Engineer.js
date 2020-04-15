// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, email, id, githubUsername) {
        super(name, email, id);
        this.githubUsername = githubUsername;
        this.role = "Engineer"
    }

    getGithubUsername() {
        return this.githubUsername;
    }
}

module.exports = Engineer;