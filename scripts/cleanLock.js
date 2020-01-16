const execSync = require("child_process").execSync;

function testBasicCleanLock() {
  const output = execSync("npx yarn-deduplicate --list yarn.lock").toString();

  if (output === "") {
    return;
  }

  console.log("The lockfile is not clean, please run 'yarn clean:lock' in the root directory.");
  throw new Error("The lockfile is not clean.");
}

function runYarnAndTestForChanges() {
  execSync("yarn", { stdio: "ignore" });
  const output = execSync("git diff yarn.lock").toString();
  if (output === "") {
    return;
  }

  console.log(output);

  console.log("The lockfile has changed, please run 'yarn' in the root folder and commit the changes.");
  throw new Error("The lockfile needs changes.");
}

function main() {
  try {
    runYarnAndTestForChanges();
    testBasicCleanLock();
    process.exit(0);
  } catch {
    process.exit(1);
  }
}

main();
