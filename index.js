const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

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
      choices: ["status", "pull", "push", "reset"]
    }
  ];
  return inquirer.prompt(question);
};

(async () => {
  init();
  const answer = await getOperation();
  const { operation } = answer;
  console.log(operation);

  // console.log(
  //   chalk.white.bgGreen.bold(`Done! File created at ${process.cwd()}/${filename}.${extension}`)
  // );
})();
