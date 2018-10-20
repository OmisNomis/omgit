const process = require('process')

const { status, pull, printOutput, push } = require('./git')
const { getDirectories, init, getOperation } = require('./utils')

module.exports = (async () => {
  init();
  const answer = await getOperation();
  const { operation } = answer;
  // let operation = "push";


  const initialDIR = process.cwd()
  let subDIRs

  switch (operation) {
    case "status":
      await status(initialDIR)
      subDIRs = getDirectories(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`

        process.chdir(nextDIR);
        await status(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "pull":
      await pull(initialDIR)
      subDIRs = getDirectories(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await pull(nextDIR)
        process.chdir(initialDIR);
      }
      break
    case "push":
      await push(initialDIR)
      subDIRs = getDirectories(initialDIR)
      for (let i = 0; i < subDIRs.length; i++) {
        let nextDIR = `${initialDIR}/${subDIRs[i]}`
        process.chdir(nextDIR);
        await push(nextDIR)
        process.chdir(initialDIR);
      }
  }

  printOutput()

})();
