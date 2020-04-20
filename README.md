# Template Engine: Employee Summary

## Description
Created a node command-line application that dynamically generates an html page with employee cards based on user input. In your terminal, navigate to the folder containing the app.js and the application can be invoked using the following commands:

npm i (to install all dependencies)

node .\app.js (to launch the application)

The application will prompt the user for input about employee information including:

* Employee Type:
    * Manager:
        * Name
        * ID
        * Email
        * Office Number
    * Engineer
        * Name
        * ID
        * Email
        * GitHub username
    * Intern:
        * Name
        * ID
        * Email
        * School

## Technologies

* node.js
    * inquirer NPM
    * jest NPM
* HTML5
* CSS3

## Challenges

In total this project took about 12 hours to build including all the time put into research and trial & error.

Difficulties included:

* Working with classes for the first time. Each employee type (Manage, Engineer, Intern) is derived from the employee class so they can inherit properties from the Employee constructor.
* Working with jest for the first time. I got stuck on unit testing because while my app worked, it did not pass the tests as written. This required some sleuthing, renaming of variables, and reordering of scoping.



## Screenshots

![GIF of Template Engine: Employee Summary](https://github.com/emmbra/homeworkWeek10/blob/master/assets/img/EmployeeSummaryDemo.gif)

## Credits

Thank you to Berkeley Coding Bootcamp, my instructor Emmanual Jucaban, and my TAs Musa Akbari and Sergio Di Martino for answering all my questions and helping me along the way.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).