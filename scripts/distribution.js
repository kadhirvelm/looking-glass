const util = require('util');
const exec = util.promisify(require("child_process").exec);
const execSync = require("child_process").execSync;

const DISTRIBUTION_PATH = `distribution`;
const TOTAL_STEPS = 4;

function cleanAllPackages() {
  return new Promise(resolve => {
    console.log(`\x1b[33mCleaning all packages and reinstalling dependencies. (1/${TOTAL_STEPS})\x1b[0m`);
    execSync("yarn clean", { stdio: "inherit" });
    console.log(`\x1b[37m\tReinstalling dependencies\x1b[0m`);
    execSync("yarn", { stdio: "inherit" });
    resolve();
  })
}

function buildPackages() {
  return new Promise(resolve => {
    console.log(`\x1b[33mBuilding dependencies in parallel. (2/${TOTAL_STEPS})\x1b[0m`);

    // NOTE: lerna takes care of resolving the dependency tree and building the packages in the correct order
    const build = exec("yarn build");    
    Promise.all([build]).then(resolve);
  });
}

function copyFilesToDistribution() {
  return new Promise(resolve => {
    console.log(`\x1b[33mProducing production folder. (3/${TOTAL_STEPS})\x1b[0m`);
    console.log("\x1b[37m\tCreating folder.\x1b[0m");
    execSync(`rm -r ${DISTRIBUTION_PATH} || true`, { stdio: "ignore" });
    execSync(`mkdir ${DISTRIBUTION_PATH}`);

    console.log("\x1b[37m\tCopying frontend over to distribution.\x1b[0m");
    const copyInterface = exec(`cp -a packages/interface/dist ${DISTRIBUTION_PATH}/interface`);

    console.log("\x1b[37m\tCopying desktop container over to distribution.\x1b[0m");
    const copyElectron = exec(`cp -a packages/electron/dist ${DISTRIBUTION_PATH}/electron`);

    Promise.all([copyInterface, copyElectron]).then(resolve);
  });
}

function buildProductionElectron() {
  return new Promise(resolve => {
    console.log(`\x1b[33mCreating production electron build. (4/${TOTAL_STEPS})\x1b[0m`);
    execSync("NODE_ENV=production yarn electron-builder", { stdio: "inherit" });
    resolve();
  });
}

async function main() {
  cleanAllPackages()
    .then(buildPackages)
    .then(copyFilesToDistribution)
    .then(buildProductionElectron)
    .then(() => {
      console.log(`\n\x1b[32mSuccessfully created production build. See '${DISTRIBUTION_PATH}' for the distribution files and see 'production' for the final application. \x1b[0m\n`);
  });
}

main();
