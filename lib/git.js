const chalk = require("chalk");
const Table = require('cli-table')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { getDirectories, isGitDirectory, getFolderName } = require('./utils')

const table = new Table({
  head: ['Repository', 'Status']
  , colWidths: [20, 70]
});


const runCommand = async cmd => {
  let res
  try {
    const { stdout, stderr } = await exec(`git ${cmd}`)
    if (stderr !== '') {
      console.log(chalk.red.bold(`${stderr}`))
    }
    res = { stdout, stderr }
  } catch (err) {
    console.log(chalk.red.bold(`Failed ${err.message}`))
  }
  return res
}

const status = async source => {
  let response

  if (isGitDirectory(getDirectories(source))) {
    const status = await runCommand("status --short")

    if (status && status.stdout !== '') {
      response = { colour: 'red', message: 'Changed' }
    } else {
      const local = await runCommand("rev-parse @")
      const remote = await runCommand("rev-parse @{u}")
      const base = await runCommand("merge-base @ @{u}")

      if (!local || !remote || !base) {
        table.push([getFolderName(source), chalk.red.bold("Failed")])
        return
      }

      if (local.stdout === remote.stdout) {
        response = { colour: 'green', message: 'Up-to-date' }
      } else if (local.stdout === base.stdout) {
        response = { colour: 'magenta', message: 'Need to pull' }
      } else if (remote.stdout === base.stdout) {
        response = { colour: 'blue', message: 'Need to push' }
      } else {
        response = { colour: 'red', message: 'Diverged' }
      }
    }


    table.push([getFolderName(source), chalk[response.colour].bold(response.message)])
  }
}

const pull = async source => {
  if (isGitDirectory(getDirectories(source))) {
    console.log(chalk.green.bold(`Pulling ${source}`))
    const res = await runCommand("pull")
    if (res && res.stdout) {
      table.push([getFolderName(source), chalk.green.bold("Pulled")])
    } else {
      table.push([getFolderName(source), chalk.red.bold("Failed")])
    }
  }
}

const stash = async source => {
  if (isGitDirectory(getDirectories(source))) {
    console.log(chalk.green.bold(`Stashing ${source}`))
    const res = await runCommand("stash")
    if (res && res.stdout) {
      table.push([getFolderName(source), chalk.green.bold("Stashed")])
    } else {
      table.push([getFolderName(source), chalk.red.bold("Failed")])
    }
  }
}

const branch = async source => {
  if (isGitDirectory(getDirectories(source))) {
    console.log(chalk.green.bold(`Getting branch for ${source}`))
    const res = await runCommand("branch")
    if (res && res.stdout) {
      table.push([getFolderName(source), chalk.green.bold(res.stdout)])
    } else {
      table.push([getFolderName(source), chalk.red.bold("Failed")])
    }
  }
}

const push = async source => {
  if (isGitDirectory(getDirectories(source))) {
    console.log(chalk.green.bold(`Pushing ${source}`))
    const res = await runCommand("push")
    if (res && res.stdout && !res.stderr) {
      table.push([getFolderName(source), chalk.green.bold("Pushed")])
    } else {
      if (res && res.stderr.trim() === 'Everything up-to-date') {
        table.push([getFolderName(source), chalk.red.green("Everything up-to-date")])
      } else {
        table.push([getFolderName(source), chalk.red.bold("Failed")])
      }
    }
  }
}

const custom = async (source, op) => {
  if (isGitDirectory(getDirectories(source))) {
    console.log(chalk.green.bold(`Performing git ${op} on ${source}`))
    const res = await runCommand(op)
    if (res && res.stdout) {
      table.push([getFolderName(source), chalk.green.bold(res.stdout)])
    } else {
      table.push([getFolderName(source), chalk.red.bold("Failed")])
    }
  }
}

const printOutput = () => {
  console.log(table.toString());
}


module.exports = {
  printOutput,
  pull,
  push,
  status,
  stash,
  branch,
  custom,
}
