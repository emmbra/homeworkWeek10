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

const check = {
    required: value => value ? undefined : 'Required',
    minLength: min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined,
    maxLength: max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
    minValue: min => value => value && value < min ? `Must be at least ${min}` : undefined,
    maxValue: max => value => value && value > max ? `Must be no more than ${max}` : undefined,
    number: value => value && isNaN(Number(value)) ? 'Must be a number' : undefined,
    email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,
    tooOld: value => value && value > 65 ? 'You might be too old for this' : undefined,
    isEmail: value => value && validator.isEmail(value),
    isPhone: value => value && validator.isMobilePhone(value),
    isMongoId: value => value && validator.isMongoId(value),
    isPostalCode: value => value && validator.isPostalCode(value),
    isPureNum: value => value && validator.isNumeric(value, { no_symbols: true }),
    isNum: value => value && validator.isNumeric(value),
    escape: input => input && validator.escape(input),
    unescape: input => input && validator.unescape(input),
    toDate: input => input && validator.toDate(input),
    toBoolean: input => input && validator.toBoolean(input),
    normalizeEmail: email => email && validator.normalizeEmail(email),
    is18: (day, month, year) => new Date(year+18, month-1, day) <= new Date() ? undefined : 'You must be at least 18 years old',
    is21: (day, month, year) => new Date(year+21, month-1, day) <= new Date() ? undefined : 'You must be at least 21 years old',
  };

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const mainMenu = async () => {
  try {
    let response = await inquirer.prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: ["Add an employee", "Build your team"],
        validate: [check.required, check.escape]
      }
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
        name: "email",
        message: "What is the employee's email?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's id number?",
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
        response.email,
        response.id,
        response2.officeNumber
      );
      employeeArr.push(manager);
    } else if (response.role === "Engineer") {
      response2 = await inquirer.prompt([
        {
          type: "input",
          name: "githubUsername",
          message: "What is the Engineer's GitHub username?",
        },
      ]);
      //store engineer info and push to employeeArr
      const engineer = new Engineer(
        response.name,
        response.email,
        response.id,
        response2.githubUsername
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
        response.email,
        response.id,
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
