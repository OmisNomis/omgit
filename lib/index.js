const process = require('process')

const { status, pull, printOutput, push, stash, branch, custom } = require('./git')
const { getDirectories, init, getOperation, confirmOp, getCustomOperation } = require('./utils')

module.exports = (async () => {
  const initialDIR = process.cwd()
  const subDIRs = getDirectories(initialDIR)

  const args = process.argv.slice(2);
  // If a command is provided, avoid having to select an item from the dropdown
  if (args.length > 0) {
    const command = args.join(' ')

    await custom(initialDIR, command)
    for (let i = 0; i < subDIRs.length; i++) {
      let nextDIR = `${initialDIR}/${subDIRs[i]}`
      process.chdir(nextDIR);
      await custom(nextDIR, command)
      process.chdir(initialDIR);


    }

    printOutput()
    return
  }


  init();

  const answer = await getOperation();
  const { operation } = answer;

  switch (operation) {
    case "status":
      await status(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`

        process.chdir(nextDIR);
        await status(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "pull":
      await pull(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await pull(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "push":
      await push(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await push(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "stash":
      await stash(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await stash(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "branch":
      await branch(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await branch(nextDIR)
        process.chdir(initialDIR);
      }
      break
  }

  printOutput()

})();
