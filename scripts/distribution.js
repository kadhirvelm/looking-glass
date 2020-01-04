const util = require('util');
const exec = util.promisify(require("child_process").exec);
const execSync = require("child_process").execSync;

const DISTRIBUTION_PATH = `distribution`;
const TOTAL_STEPS = 4;
const SPECIAL_PACKAGE_DIRECTORY_NAMES = ["electron", "interface"];

function cleanAllPackages() {
  return new Promise(resolve => {
    console.log(`\x1b[33mCleaning all packages and reinstalling dependencies. (1/${TOTAL_STEPS})\x1b[0m`);
    execSync("yarn clean", { stdio: "inherit" });
    console.log(`\x1b[37m\tReinstalling dependencies\x1b[0m`);
    execSync("yarn", { stdio: "ignore" });
    resolve();
  })
}

function buildDependencies() {
  return new Promise(resolve => {
    console.log(`\x1b[33mBuilding dependencies in parallel. (2/${TOTAL_STEPS})\x1b[0m`);
    const dependencyPackages = execSync("cd packages && ls").toString().split("\n").filter(packageName => packageName !== "" && !SPECIAL_PACKAGE_DIRECTORY_NAMES.includes(packageName));

    const buildPackages = dependencyPackages.map(packageName => {
      console.log(`\x1b[37m\tBuilding ${packageName}\x1b[0m`);
      return exec(`cd packages/${packageName} && yarn build`);
    });

    Promise.all(buildPackages).then(() => resolve());
  });
}

function buildInterface() {
  return new Promise(resolve => {
    console.log(`\x1b[33mBuilding frontend. (3/${TOTAL_STEPS})\x1b[0m`);
    console.log("\x1b[37m\tBuilding interface package.\x1b[0m");
    const interface = exec("cd packages/interface && yarn build");

    Promise.all([interface]).then(resolve);
  });
}

function copyInterfaceToDistribution() {
  return new Promise(resolve => {
    console.log(`\x1b[33mProducing production folder. (4/${TOTAL_STEPS})\x1b[0m`);
    console.log("\x1b[37m\tCreating folder.\x1b[0m");
    execSync(`rm -r ${DISTRIBUTION_PATH} || true`, { stdio: "ignore" });
    execSync(`mkdir ${DISTRIBUTION_PATH}`);

    console.log("\x1b[37m\tCopying interface contents over to distribution.\x1b[0m");
    const copyInterface = exec(`cp -a packages/interface/dist ${DISTRIBUTION_PATH}/interface`);

    Promise.all([copyInterface]).then(resolve);
  });
}

async function main() {
  cleanAllPackages().then(buildDependencies).then(buildInterface).then(copyInterfaceToDistribution).then(() => {
    console.log(`\n\x1b[32mSuccessfully created production build. See ${DISTRIBUTION_PATH} \x1b[0m\n`);
  });
}

main();
