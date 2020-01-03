const execSync = require("child_process").execSync;

const output = execSync("npx yarn-deduplicate --list ../yarn.lock").toString();

if (output === "") {
  process.exit(0);
} else {
  console.log("The lockfile is not clean, please run 'npx yarn-deduplicate yarn.lock' in the root directory.");
  process.exit(1);
}
