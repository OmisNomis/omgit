const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => name).filter(name => isDirectory(join(source, name)))
const isGitDirectory = sourceArr => sourceArr.filter(dirName => dirName === '.git').length > 0

const getFolderName = source => source.split('/').splice(-1, 1)[0]

const init = () => {
  console.log(
    chalk.red(
      figlet.textSync("Welcome to the OMGit CLI", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const getOperation = () => {
  const question = [
    {
      type: "list",
      name: "operation",
      message: "What Git operation would you like to perform?",
      choices: ["status", "pull", "push", "stash", "branch", "custom"]
    }
  ];
  return inquirer.prompt(question);
};

const getCustomOperation = () => {
  const question = [
    {
      type: "input",
      name: "customOperation",
      message: "Enter your custom command"
    }
  ];
  return inquirer.prompt(question);
}

const confirmOp = () => {
  const question = [
    {
      type: "confirm",
      name: "confirm",
      message: "This CLI provides no protection for custom commands. Are you sure you want to proceed?"
    }
  ]

  return inquirer.prompt(question)
}

module.exports = {
  getDirectories,
  getFolderName,
  getOperation,
  getCustomOperation,
  init,
  isGitDirectory,
  confirmOp,
}
