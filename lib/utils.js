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
      figlet.textSync("Welcome to the MGit CLI", {
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
      choices: ["status", "pull", "push"]
    }
  ];
  return inquirer.prompt(question);
};


module.exports = {
  getDirectories,
  getFolderName,
  getOperation,
  init,
  isGitDirectory
}
