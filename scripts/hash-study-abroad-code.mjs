import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

const N = 16384;
const r = 8;
const p = 1;
const KEY_LENGTH = 64;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// Hide the access code while it is being typed.
rl._writeToOutput = function (text) {
  if (text === "\n" || text === "\r\n" || text === "\r") {
    rl.output.write(text);
  }
};

function finish(code, confirmation) {
  rl.close();
  rl.output.write("\n");

  if (code.length < 12) {
    console.error("Use an access code with at least 12 characters.");
    process.exit(1);
  }

  if (code !== confirmation) {
    console.error("The access codes did not match.");
    process.exit(1);
  }

  const salt = randomBytes(32);
  const hash = scryptSync(code.normalize("NFKC"), salt, KEY_LENGTH, {
    cost: N,
    blockSize: r,
    parallelization: p,
  });
  const hashValue = [
    "scrypt",
    N,
    r,
    p,
    salt.toString("hex"),
    hash.toString("hex"),
  // Use ":" instead of "$" so the value can be pasted into .env.local without
  // Next.js interpreting the numeric segments as environment variables.
  ].join(":");

  console.log("Add these to .env.local and your deployment environment:");
  console.log("Do not commit the real values.");
  console.log("");
  console.log(`STUDY_ABROAD_ACCESS_CODE_HASH=${hashValue}`);
  console.log(
    `STUDY_ABROAD_SESSION_SECRET=${randomBytes(32).toString("base64url")}`
  );
}

rl.question("Enter private access code (min 12 characters): ", (code) => {
  rl.output.write("\n");
  rl.question("Confirm access code: ", (confirmation) => {
    finish(code, confirmation);
  });
});
