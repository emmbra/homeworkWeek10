const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employeeArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const mainMenu = async () => {
  try {
    let response = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ["Add an employee", "Generate team.html page"],
      },
    ]);
    if (response.choices === "Add an employee") {
      questionPrompts();
    } else {
      //  render(employeeArr);
      let htmlfile = render(employeeArr);
      console.log(htmlfile);
      await writeFileAsync(outputPath, htmlfile);
    }
  } catch (e) {
    console.log("Error with main menu!" + e);
  }
};

const questionPrompts = async () => {
  try {
    let response = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's id number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
      },
    ]);

    let response2 = "";

    // if statements to ask more prompts based on employee roles
    if (response.role === "Manager") {
      response2 = await inquirer.prompt([
        {
          type: "input",
          name: "officeNumber",
          message: "What is the Manager's phone number?",
        },
      ]);
      //store manager info and push to employeeArr
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response2.officeNumber
      );
      employeeArr.push(manager);
    } else if (response.role === "Engineer") {
      response2 = await inquirer.prompt([
        {
          type: "input",
          name: "github",
          message: "What is the Engineer's GitHub username?",
        },
      ]);
      //store engineer info and push to employeeArr
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response2.github
      );
      employeeArr.push(engineer);
    } else if (response.role === "Intern") {
      response2 = await inquirer.prompt([
        {
          type: "input",
          name: "school",
          message: "What is the Intern's school?",
        },
      ]);
      //store intern info and push to employeeArr
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response2.school
      );
      employeeArr.push(intern);
    }

    console.log(employeeArr);
    mainMenu();
  } catch (e) {
    console.log("Error with Question Prompts!" + e);
  }
};

mainMenu();
